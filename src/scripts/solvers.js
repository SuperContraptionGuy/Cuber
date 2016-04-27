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

	this.Algorithm = function(twists, cycle) {
		this.twists = twists
		if(cycle.constructor === Array)
			this.cycle = cycle

		this.twist = function(cube) {
			cube.twist(this.twists)
		}
	}

	this.Algorithm.inverse = function() {
		return new this.Algorithm(this.twists.reverse().invert(), this.cycle.reverse())
	}

	this.Algorithm.concat = function(a2) { 	// TODO: doesn't handle concatination of cycles yet
		return new this.Algorithm(this.twists.concat(a2.twists))
	}

	this.Algorithm.repeat = function(n) {
		newCycle = this.cycle
		length = newCycle.length

		for(i = 0; i < length; i++) {
			newCycle[i] = this.cycle[(i * n) % length]
		}

		return new this.Algorithm(this.twists.multiply(n), newCycle)
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

	


	var algs = this.algorithms


	// TODO: Update the algorithms below


	// Simple algorithms ----------------
	// centers:


	// edges:


	// corners:



	// Commutator algorithms ---------------
	// centers:
	//var cycleCenters = commutator('m', 's')	// 3 state cycle 	[ 4 > 10 > 14 > 4 ](clean)
	//cycleCenters = new ERNO.Solver.Algorithm(commutator('m', 's'), [4, 10, 14, 4])
	algs.cycleCenters = new this.Algorithm(algs.commutator('m', 's'), [4, 10, 14])


	// edges:
	algs.cycleEdges = new this.Algorithm(algs.commutator('mUM', 'd'), [7, 17, 11])

	// corners:
	algs.cornerDown = new this.Algorithm(algs.commutator('r', 'd'), [])
	algs.cycleCorners = new this.Algorithm(algs.commutator('rdR', 'u'), [0, 8, 2])
	// var orientCorners = cornerDown.multiply(2) 	// Orients 2, 8, 24, 26(clean)
	algs.orientCorners = new this.Algorithm(algs.cornerDown.)

	// Conjugate algorithms -------------
	// centers:


	// edges:
	var cycleEdgesOnFace = conjugate('ru', cycleEdges)	// 3 state cycle 	[ 1 > 7 > 5 > 1 ](clean)
	var reverseCycleEdges = conjugate('D', commutator('Mum', 'D')) 	// 3 state cycle 	[ 7 > 11 > 17 > 7 ](clean)

	// corners:


	// need:
	// corner orientation algorithms
	// edge orientation algorithms


	// flips edges 1, 7, 11, 25
	var flipEdges = commutator('mUM', 'dMdm').concat(conjugate('ddurru', cycleEdges))

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
