/*


	SOLVERS

	Our Cube has its own animation loop conveniently called Cube.loop().
	If Cube.isSolving === true then within that loop Cube will call
	window.solver.consider( cube ). This means when you create your own
	Solver instance you have to set window.solver equal to your instance.

	Solver.consider() will do some very basic checking and if all's well
	will pass the Cube instance to Solver.logic() which is the function that
	you need to write yourself. 

	Your logic() should return false is the cube is solved or if something's
	gone horribly wrong. This will set Cube.isSolving = false and stop the
	solver from being called within the Cube's animation loop. 

	Your logic() should return true if an incremental improvement has been 
	made and the logic() should be run again in the next loop; For example,
	run again after a twist queue completes.

	--

	@author Mark Lundin - http://www.mark-lundin.com
	@author Stewart Smith


*/






ERNO.Solver = function(){


	//  When you create your own Solver this is the only function you need to build yourself.
	//  Having said that, it will probably be the most intense function like ... ever!
	//  Check out my example in /scripts/solvers/stewart.js to see how you might go about it.

	this.state = 0

	this.Algorithm = function(Twists, Cycles) { 	// TODO: Cycles are not set when passing Cycles object


		// Manage the actual move of the algorithm
		this.Twists = function(twists) {

			if(twists != undefined) {
				if(twists.constructor === String) {
					this.twists = twists
				} else {
					this.twists = ''
				}
			} else {
				this.twists = ''
			}

			this.twist = function(cube) {
				cube.twist(this.twists)
			}

			this.inverse = function() {
				return new this.constructor(this.twists.reverse().invert())
			}
			this.concat = function(a2) {
				return new this.constructor(this.twists.concat(a2.twists.twists))
			}
			this.repeat = function(n) {
				return new this.constructor(this.twists.multiply(n))
			}
		}

		if(Twists != undefined) {
			if(Twists.constructor === String) {
				this.twists = new this.Twists(Twists)
			} else {
				this.twists = Twists
			}
		} else {
			this.twists = new this.Twists()
		}

		this.twist = function(cube) {
			this.twists.twist(cube)
		}

		this.setTwists = function(twists) {
			this.twists.twists = twists
		}

		this.getTwists = function() {
			return this.twists.twists
		}


		// Manage the functional cycles produced by the algorithm
		this.Cycles = function(cycles) {

			this.cycles = []

			this.Cycle = function(pieces) {

				if(pieces != undefined) {
					if(pieces.constructor === Array) {
						this.pieces = pieces
					} else {
						this.pieces = pieces
					}
				} else {
					this.pieces = []
				}

				this.Piece = function(address, orientation) {

					this.address = address
					this.orientation = orientation
				}

				this.addPiece = function(address, orientation) {
					this.pieces.push(new this.Piece(address, orientation))
					return this
				}

				this.inverse = function() {
					newCycle = new this.constructor()

					newCycle.pieces = this.pieces.reverse()

					return newCycle
				}
				this.concat = function(a2) {
					// TODO: concatination handling -- causation analysis/recusive analysis
				}
				this.repeat = function(n) {
					newCycle = this.constructor()
					
					this.pieces.forEach(function(piece, i) {
						newCycle.pieces[i] = this.pieces[(i * n) % this.pieces.length]
					})

					return newCycle
				}
			}

			if(cycles != undefined) {
				if(cycles.constructor === Array) {
					this.faceCycle = cycles[0]
					this.edgeCycle = cycles[1]
					this.cornerCycle = cycles[2]
				} else {
					this.faceCycle = cycles[0]
					this.edgeCycle = cycles[1]
					this.cornerCycle = cycles[2]
				}
			} else {
				this.faceCycle = new this.Cycle()
				this.edgeCycle = new this.Cycle()
				this.cornerCycle = new this.Cycle()
			}
			this.cycles.push(this.faceCycle)
			this.cycles.push(this.edgeCycle)
			this.cycles.push(this.cornerCycle)

			var parent = this

			this.setCycles = function(cyclesArray) {
				cyclesArray.forEach(function(cycle, i) {
					cyclesArray[i].forEach(function(placeholder, j) {
						if(cyclesArray[i][j][0] != undefined && cyclesArray[i][j][1] != undefined)
						parent.cycles[i].addPiece(cyclesArray[i][j][0], cyclesArray[i][j][1])
					})
				})
			}

			this.inverse = function() {
				newCycles = new this.constructor()

				this.cycles.forEach(function(cycle, i) {
					newCycles.cycles[i] = cycle.inverse()
				})

				return newCycles
			}
			this.concat = function(a2) {
				newCycles = new this.constructor()

				this.cycles.forEach(function(cycle, i) {
					newCycles.cycles[i] = cycle.concat(a2)
				})

				return newCycles
			}
			this.repeat = function(n) {
				newCycles = new this.constructor()

				this.cycles.forEach(function(cycle, i) {
					newCycles.cycles[i] = cycle.repeat(n)
				})

				return newCycles
			}
		}

		if(Cycles != undefined) {
			if(Cycles.constructor === this.Cycles) {
				this.cycles = Cycles
			} else {
				this.cycles = new this.Cycles()
			}
		} else {
			this.cycles = new this.Cycles()
		}

		this.setCycles = function(cyclesArray) {
			this.cycles.setCycles(cyclesArray)
		}

		//this.getCycle = function() //	TODO: add get functions
		


		// Modifier functions used to combine or modifiy the algorithm
		this.inverse = function() {
			// newTwists = this.twists.inverse()
			// newCycles = this.cycles.inverse()
			// newAlg = new this.constructor(this.twists.inverse(), this.cycles.inverse())

			// newAlg.twists = newTwists
			// newAlg.cycles = newCycles

			return new this.constructor(this.twists.inverse(), this.cycles.inverse())
		}
		this.concat = function(a2) { 	// TODO: Cycles doesn't handle concatination of cycles yet
			// newTwists = this.twists.concat(a2)
			// newCycles = this.cycles.concat(a2)
			// newAlg = new this.constructor()

			// newAlg.twists = newTwists
			// newAlg.cycles = newCycles

			// return newAlg
			return new this.constructor(this.twists.concat(a2), this.cycles.concat(a2))
		}
		this.repeat = function(n) { 	// TOD: Cycles don't construct properly
			// newTwists = this.twists.repeat(n)
			// newCycles = this.cycles.repeat(n)
			// newAlg = new this.constructor()

			// newAlg.twists = newTwists
			// newAlg.cycles = newCycles

			// return newAlg
			return new this.constructor(this.twists.repeat(n), this.cycles.repeat(n))
		}

		return this
	}

	

	//			algorithms and functions for solving:


	// Algorithm functions ----------------------

	this.algorithms = {}

	this.algorithms.commutator = function(a1, a2) {
		return 	a1
				.concat(a2)
				.concat(a1.inverse())
				.concat(a2.inverse())
	}

	this.algorithms.conjugate = function(a1, a2) {
		return 	a1
				.concat(a2)
				.concat(a1.inverse())
	}

	


	var a = this.algorithms


	// TODO: Update the algorithms below


	// Simple algorithms ----------------


	a.L = new this.Algorithm('L')
	a.L.setCycles([[[]], [[3, 0], [21, 0], [9, 0], [15, 0]], [[0, 0], [6, 0], [24, 0], [18, 0]]])

	// a.L = a.L.constructor('L', 
	// 	a.L.Cycles([
	// 		a.L.cycles.faceCycle.constructor(), 
	// 		a.L.cycles.edgeCycle.addPiece(3).addPiece(21).addPiece(9).addPiece(15), 
	// 		a.L.cycles.cornerCycle.addPiece(0).addPiece(6).addPiece(24).addPiece(18)
	// 	])
	// )




	// centers:


	// edges:


	// corners:



	// Commutator algorithms ---------------
	// centers:
	//var cycleCenters = commutator('m', 's')	// 3 state cycle 	[ 4 > 10 > 14 > 4 ](clean)
	//cycleCenters = new ERNO.Solver.Algorithm(commutator('m', 's'), [4, 10, 14, 4])
	// algs.cycleCenters = new this.Algorithm(algs.commutator('m', 's'), [4, 10, 14])


	// edges:
	// algs.cycleEdges = new this.Algorithm(algs.commutator('mUM', 'd'), [7, 17, 11])

	// corners:
	// algs.cornerDown = new this.Algorithm(algs.commutator('r', 'd'), [])
	// algs.cycleCorners = new this.Algorithm(algs.commutator('rdR', 'u'), [0, 8, 2])
	// var orientCorners = cornerDown.multiply(2) 	// Orients 2, 8, 24, 26(clean)
	// algs.orientCorners = new this.Algorithm(algs.cornerDown.repeat(2))

	// Conjugate algorithms -------------
	// centers:


	// edges:
	// var cycleEdgesOnFace = conjugate('ru', cycleEdges)	// 3 state cycle 	[ 1 > 7 > 5 > 1 ](clean)
	// var reverseCycleEdges = conjugate('D', commutator('Mum', 'D')) 	// 3 state cycle 	[ 7 > 11 > 17 > 7 ](clean)

	// corners:


	// need:
	// corner orientation algorithms
	// edge orientation algorithms


	// flips edges 1, 7, 11, 25
	// var flipEdges = commutator('mUM', 'dMdm').concat(conjugate('ddurru', cycleEdges))

	// 		Functions for organizing and executing algorithms



	this.logic = function( cube ) { 
		console.log("Solving...")
		console.log("Current solve state: ", this.state)

		//solving states
		if(this.state == 0) {

			this.state++
			return true
		}
		if(this.state == 1) {

			this.state++
			return true
		}
		if(this.state == 2) {

			this.state++
			return true
		}
		if(this.state == 3) {

			this.state++
			return true
		}

		//solved state
		if(this.state > 3) {

			console.log("Solved state reached")
			return false
		}
		

	}
}


//  This is the method called within Cube.loop() when Cube.isSolving === true.
//  It will call Solver.logic() which is the function you need to fill in.

ERNO.Solver.prototype.consider = function( cube ){


	//  Was our solver passed a valid Cube?
	//  Kind of important, eh?

	if( cube === undefined ){

		console.warn( 'A cube [Cube] argument must be specified for Solver.consider().' );
		return false;
	}
	else if( cube instanceof ERNO.Cube === false ){

		console.warn( 'The cube argument provided is not a valid Cube.' );
		return false;
	}


	//  If we're solving we should really make certain we aren't shuffling!
	//  Otherwise our logic will never actually run.
	//  The hook for this is in Cube.loop() so look there to see what's up.

	cube.isShuffling = false;


	//  If the cube is already solved then our job is done before it started.
	//  If not, we need to try solving it using our current solve method.

	if( cube.isSolved() ){

		ERNO.Solver.prototype.explain( 'I’ve found that the cube is already solved.' );
		return false;
	}
	else return this.logic( cube );
};




//  We should always hit at what the Solver wants to do next
//  so we can hault auto-solving and give the user a chance to 
//  figure out the next move for his/herself.

ERNO.Solver.prototype.hint = function( text ){

	console.log(

		'%c'+ text +'%c\n',
		'background-color: #EEE; color: #333', ''
	);
};


//  If hinting is text displayed *before* a move is made
//  then explaining is text displayed *after* a move is made.

ERNO.Solver.prototype.explain = function( text ){

	console.log(

		'Solver says: %c '+ text +' %c\n',
		'color: #080', ''
	);
};



window.solver = new ERNO.Solver











// // Simple algorithms ----------------
// // centers:


// // edges:


// // corners:



// // Commutator algorithms ---------------
// // centers:
// //var cycleCenters = commutator('m', 's')	// 3 state cycle 	[ 4 > 10 > 14 > 4 ](clean)
// cycleCenters = new ERNO.Solver.Algorithm(commutator('m', 's'), [4, 10, 14, 4])


// // edges:
// var cycleEdges = commutator('mUM', 'd')	// 3 state cycle 	[ 7 > 17 > 11 > 7 ](clean)
// var inverseCycleEdges = negate(cycleEdges)

// // corners:
// var cornerDown = commutator('r', 'd') 	// translates 2 to from top layer to bottom layer 	[ 2 > 8 > 2 ](noisy on bottom layer)
// var cycleCorners = commutator('rdR', 'u')	// 3 state cycle 	[ 0 > 8 > 2 > 0 ](clean)
// var orientCorners = cornerDown.multiply(2) 	// Orients 2, 8, 24, 26(clean)

// // Conjugate algorithms -------------
// // centers:


// // edges:
// var cycleEdgesOnFace = conjugate('ru', cycleEdges)	// 3 state cycle 	[ 1 > 7 > 5 > 1 ](clean)
// var reverseCycleEdges = conjugate('D', commutator('Mum', 'D')) 	// 3 state cycle 	[ 7 > 11 > 17 > 7 ](clean)

// // corners:


// // need:
// // corner orientation algorithms
// // edge orientation algorithms


// // flips edges 1, 7, 11, 25
// var flipEdges = commutator('mUM', 'dMdm').concat(conjugate('ddurru', cycleEdges))

// // 		Functions for organizing and executing algorithms
