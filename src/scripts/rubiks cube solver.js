cube.solve() = function () {
	// This is my first attempt at solving a rubik's cube programatically.
	// Orient the cube
	// First, start with the corners:
	for(var i = 0; i < cube.up.corners.cubelets.length; i++) {
		var active = cube.up.corners.cubelets[i]
		
	}
}

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
	newTop = top.origin.id
	newFront = front.origin.id

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
}

function switchCorners(corner1, corner2) { //	This function works for ending points on the top layer only.
	if(corner1.address == corner2.address) {
		return 0
	} else {
		if(cube.up.hasId(corner1.id)) { // Cubelet1 is in top layers
			//orient the cube first
			cube.faces.forEach(
				function(face) {
					if(face.northEast == corner1 && face.name != "up" && face.name != "down") {
						twist(orientCube(face, cube.up))
						return 0
					}
				}
			)
			// then do the algorithm1
			twist(cornerDown)
		} else { // cubelet1 is in bottom layer
			cube.faces.forEach(
				function(face) {
					if(face.southEast == corner1 && face.name != "up" && face.name != "down") {
						twist(orientCube(face, cube.up))
						return 0
					}
				}
			)
		}
		// orient the cube to cubelet2 and rotate bottom
	}
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
var orientCorners = cprmerDown.multiply(2) 	// Orients 2, 8, 24, 26(clean)

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