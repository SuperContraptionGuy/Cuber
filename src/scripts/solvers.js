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

//ERNO.Solver = 


/*  
		This is my own code from here to after ERNO.Solver.
		Hudson Kendall
		4/25/16
*/

// cube.solve() = function () {
// 	// This is my first attempt at solving a rubik's cube programatically.
// 	// Orient the cube
// 	// First, start with the corners:
// 	for(var i = 0; i < cube.up.corners.cubelets.length; i++) {
// 		var active = cube.up.corners.cubelets[i]
		
// 	}
// }

// Algorithm functions ----------------------

function commutator(a1, a2) {
	return a1
		.concat(a2)
		.concat(a1.reverse().invert())
		.concat(a2.reverse().invert());
}

function conjugate(a1, a2) {
	return a1
		.concat(a2)
		.concat(a1.reverse().invert());
}

function negate(a) {
	return a.reverse().invert();
}

// Cube functions ---------------------------

function twist(twists) {
	cube.twist(twists);
}

function addQueue(action) {
	cube.taskQueue.add(action)
}

function orientCube(front, top) {
	// newTop = (top instanceof ERNO.Slice) ? top.origin.id : top
	// newFront = (front instanceof ERNO.Slice) ? front.origin.id : front

	var newTop = top
	if(top instanceof ERNO.Slice) {
		newTop = top.origin.id
	}

	var newFront = front
	if(front instanceof ERNO.Slice) {
		newFront = front.origin.id
	}

	// orient front face
	// if(cube.front.origin.id == newFront) {
	// 	// Front is in front
	// } else { // front is not already in the front
	// 	if(cube.up.origin.id == newFront || cube.down.origin.id == newFront) { // front is on the top or bottom
	// 			cube.twist('X')
	// 	} else { // front is on sides or back
	// 			cube.twist('Y')
	// 	}
	// }		return [, , ]

	var up = cube.up.origin.id
	var down = cube.down.origin.id
	var left = cube.left.origin.id
	var right = cube.right.origin.id
	var front = cube.front.origin.id
	var back = cube.back.origin.id

	if(newFront == up) {
		return ('x'.multiply(1))
		if(newTop == up) {
			//cube.twist(''.multiply(1))
			return -1
		} else {
			if(newTop == down) {
				//cube.twist('z'.multiply(2))
				return -1
			} else {
				if(newTop == left) {
					return ('Z'.multiply(1))
				} else {
					if(newTop == right) {
						return ('z'.multiply(1))
					} else {
						if(newTop == back) {
							//cube.twist('Z'.multiply(1))
						} else { // it is front
							return ('z'.multiply(2))
						}
					}
				}
			}
		}
	} else {
		if(newFront == down) {
			return ('X'.multiply(1))
			if(newTop == up) {
				//cube.twist(''.multiply(1))
				return -1
			} else {
				if(newTop == down) {
					//cube.twist('z'.multiply(2))
					return -1
				} else {
					if(newTop == left) {
						return ('Z'.multiply(1))
					} else {
						if(newTop == right) {
							return ('z'.multiply(1))
						} else {
							if(newTop == back) {
								return ('z'.multiply(2))
							} else { // it is front
								//cube.twist(''.multiply(1))
							}
						}
					}
				}
			}
		} else {
			if(newFront == left) {
				return ('y'.multiply(1))
				if(newTop == up) {
					//cube.twist(''.multiply(1))
				} else {
					if(newTop == down) {
						return ('z'.multiply(2))
					} else {
						if(newTop == left) {
							//cube.twist('Z'.multiply(1))
							return -1
						} else {
							if(newTop == right) {
								//cube.twist('z'.multiply(1))
								return -1
							} else {
								if(newTop == back) {
									return ('Z'.multiply(1))
								} else { // it is front
									return ('z'.multiply(1))
								}
							}
						}
					}
				}
			} else {
				if(newFront == right) {
					return ('Y'.multiply(1))
					if(newTop == up) {
						//cube.twist(''.multiply(1))
					} else {
						if(newTop == down) {
							return ('z'.multiply(2))
						} else {
							if(newTop == left) {
								//cube.twist('Z'.multiply(1))
								return -1
							} else {
								if(newTop == right) {
									//cube.twist('z'.multiply(1))
									return -1
								} else {
									if(newTop == back) {
										return ('z'.multiply(1))
									} else { // it is front
										return ('Z'.multiply(1))
									}
								}
							}
						}
					}
				} else {
					if(newFront == back) {
						return ('y'.multiply(2))
						if(newTop == up) {
							//cube.twist(''.multiply(1))
						} else {
							if(newTop == down) {
								return ('z'.multiply(2))
							} else {
								if(newTop == left) {
									return ('z'.multiply(1))
								} else {
									if(newTop == right) {
										return ('Z'.multiply(1))
									} else {
										if(newTop == back) {
											//cube.twist(''.multiply(1))
											return -1 // faces are opposite
										} else { // it is front
											//cube.twist(''.multiply(1))
											return -1 // both faces are the same
										}
									}
								}
							}
						}
					} else { // it is front
						//cube.twist(''.multiply(1))
						if(newTop == up) {
							//cube.twist(''.multiply(1))
						} else {
							if(newTop == down) {
								return ('z'.multiply(2))
							} else {
								if(newTop == left) {
									return ('Z'.multiply(1))
								} else {
									if(newTop == right) {
										return ('z'.multiply(1))
									} else {
										if(newTop == back) {
											//cube.twist(''.multiply(1))
											return -1 // faces are opposite
										} else { // it is front
											//cube.twist(''.multiply(1))
											return -1 // both faces are the same
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	// // orient top face
	// if(cube.up.origin.id == newTop) {
	// 	return 0// top is on top
	// } else { // top needs to be oriented
	// 	if(cube.back.origin.id == newTop) {  // check if it is possible
	// 		return -1 // Error, top and front are on opposite faces
	// 	} else {
	// 			cube.twist('Z')
	// 	}
	// }
	// var up = cube.up.origin.id
	// var down = cube.down.origin.id
	// var left = cube.left.origin.id
	// var right = cube.right.origin.id
	// var front = cube.front.origin.id
	// var back = cube.back.origin.id
	
	// if(newTop == up) {
	// 	//cube.twist(''.multiply(1))
	// } else {
	// 	if(newTop == down) {
	// 		cube.twist('z'.multiply(2))
	// 	} else {
	// 		if(newTop == left) {
	// 			cube.twist('Z'.multiply(1))
	// 		} else {
	// 			if(newTop == right) {
	// 				cube.twist('z'.multiply(1))
	// 			} else {
	// 				if(newTop == back) {
	// 					//cube.twist(''.multiply(1))
	// 					return -1 // faces are opposite
	// 				} else { // it is front
	// 					//cube.twist(''.multiply(1))
	// 					return -1 // both faces are the same
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	return false	// no need to repeat this one for each operation.
}

function switchCorners(corner1, corner2) { //	This function works for ending points on the top layer only.
	
	console.log("Running corner switcher alg.")


	// remember the current orientation:
	var frontFace = cube.front.origin.id

	if(!(corner1 instanceof ERNO.Cubelet)) {
		corner1 = cube.hasAddress(corner1).cubelets[0]
	}
	if(!(corner2 instanceof ERNO.Cubelet)) {
		corner2 = cube.hasAddress(corner2).cubelets[0]
	}

	console.log("corner addresses: ", corner1.address, corner2.address)

	cube.setOpacity(0.1)
	corner1.setOpacity(1)
	corner2.setOpacity(1)

	if(corner1.address == corner2.address) {
		console.log("corners are the same corner")
		return 0
	} else {
		if(corner1.addressY > 0) { // Cubelet1 is in top layers
			console.log("on top")
			console.log(corner1.address)

			//orient the cube first
			var address = corner1.address
			if(address == 0) {
				twist(orientCube(cube.left, cube.up))
			} else {
				if(address == 2) {
					// do nothing
				} else {
					if(address == 20) {
						twist(orientCube(cube.right, cube.up))
					} else {// address is 18
						twist(orientCube(cube.back, cube.up))
					}
				}
			}

			// then do the algorithm to take it to the bottom layer
			twist(cornerDown)

			return true 	// needs to wait until move are complete for the rest of the function

		} else { // cubelet1 is in bottom layer
			console.log("on bottom")
			console.log(corner1.address)

			//orient the cube first
			var address = corner1.address
			if(address == 6) {
				twist(orientCube(cube.left, cube.up))
				return true
			} else {
				if(address == 8) {
					// do nothing
				} else {
					if(address == 26) {
						twist(orientCube(cube.right, cube.up))
						return true
					} else {// address is 18
						twist(orientCube(cube.back, cube.up))
						return true
					}
				}
			}
		}
		// orient the cube to cubelet2 and rotate bottom
		var address = corner2.address
		console.log("second piece:")
		console.log(address)
		if(address == 0) {
			twist(orientCube(cube.left, cube.up))
			twist('d')
		} else {
			if(address == 2) {
				twist(orientCube(cube.front, cube.up))
				//twist('')
			} else {
				if(address == 20) {
					twist(orientCube(cube.right, cube.up))
					twist('D')
				} else {// address is 18
					twist(orientCube(cube.back, cube.up))
					twist('dd')
				}
			}
		}

		//then twist the bottom face to get the first corner under it
		// cube.taskQueue.add(function(){
		// 	if(corner1.addressX < corner2.addressX) {
		// 		if(corner1.addressY < corner2.addressY) {
		// 			twist('dd')
		// 		} else {
		// 			twist('D')
		// 		}
		// 	} else {
		// 		if(corner1.addressY < corner2.addressY) {
		// 			twist('d')
		// 		} else {
		// 			//in position already
		// 		}
		// 	}
		// })

		// then switch the corners that are now one on top of the other
		twist(cornerDown)
		return false 	// function completed.
	}

	cube.taskQueue.add(function(){
		twist(orientCube(frontFace, cube.up))
	})
}

// Simple algorithms ----------------
// centers:


// edges:


// corners:



// Commutator algorithms ---------------
// centers:
var cycleCenters = commutator('m', 's')	// 3 state cycle 	[ 4 > 10 > 14 > 4 ](clean)

// edges:
var cycleEdges = commutator('mUM', 'd')	// 3 state cycle 	[ 7 > 17 > 11 > 7 ](clean)
var inverseCycleEdges = negate(cycleEdges)

// corners:
var cornerDown = commutator('r', 'd') 	// translates 2 to from top layer to bottom layer 	[ 2 > 8 > 2 ](noisy on bottom layer)
var cycleCorners = commutator('rdR', 'u')	// 3 state cycle 	[ 0 > 8 > 2 > 0 ](clean)
var orientCorners = cornerDown.multiply(2) 	// Orients 2, 8, 24, 26(clean)

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


//	================== Actual solver function!!! ====================================================================

ERNO.Solver = function(){


	//  When you create your own Solver this is the only function you need to build yourself.
	//  Having said that, it will probably be the most intense function like ... ever!
	//  Check out my example in /scripts/solvers/stewart.js to see how you might go about it.


	this.explain("Solver initalize")

	this.logic = function( cube ){ 

		if(cube.twistQueue.future.length > 0) {
			// there are twists still in the queue, wait till they are gone.
			return true
		}

		// This is my first attempt at solving a rubik's cube programatically.
		// Orient the cube
		if(orientCube(cube.hasId(4).address, cube.hasId(10).address)) {
			return true
		}

		// First, start with the corners:
		var active
		for(var i = 0; i < cube.up.corners.cubelets.length; i++) {
			active = cube.up.corners.cubelets[i]
			console.log(i)
			if(switchCorners(active, active.id)) {
				return true
			}
			
		}

		// var active
		// // active = cube.up.corners.cubelets[i]
		// // console.log(i)
		// // switchCorners(active, active.id)
		// var i = 0
		// while(true) {
		// 	active = cube.up.corners.cubelets[i]
		// 	console.log("finding corner...")
		// 	console.log(i)
		// 	i++
		// 	if(active.id != active.address) {
		// 		cube.taskQueue.add(function(){
		// 			switchCorners(active, active.id)
		// 		})
		// 		console.log("break")
		// 		console.log(i)
		// 		return true
		// 	}
		// 	if(i > 3)
		// 		break
		// }


		this.explain("Solver Complete")
		return false
	};;
	 // this means the cube is solved.  if it's true, this would probable be more of an iterative function with hints and explanations and the like.
	// return false
}




//  This is the method called within Cube.loop() when Cube.isSolving === true.
//  It will call Solver.logic() which is the function you need to fill in.

ERNO.Solver.prototype.consider = function( cube ){
// window.solver.consider = function( cube ){


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



// got to actually initalize the object.
window.solver = new ERNO.Solver

