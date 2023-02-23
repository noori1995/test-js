//
//
// data is array of blocks that each index is a BLOCK that contains facilities which has that facility in it or not
// we wnat to found index of a block that has the nearest distance from each facility
//
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// e.g in index 0 (block 1) we only have a school and park is in next block (index 2 or block 2) and the distance is 1
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
//
// ***********************************************************************************
// *********************************** HINT ******************************************
// ***********************************************************************************
//  1.draw the neighberhood, blocks and facilities in each block on a paper
//  2.found the answer on the paper
//  3.write your calculation
//  4.say it loud to yourself (trust me) :)
//  5.then write the code
// ***********************************************************************************
// ***********************************************************************************
//
//                            /\  WISH YOU BEST LUCK  /\
//

const data = [
  {
    block: 1,
    facilities: {
      park: false,
      gym: false,
      super_market: false,
      school: true,
    },
  },
  {
    block: 2,
    facilities: {
      park: true,
      gym: true,
      super_market: false,
      school: true,
    },
  },
  {
    block: 3,
    facilities: {
      park: true,
      gym: false,
      super_market: false,
      school: false,
    },
  },
  {
    block: 4,
    facilities: {
      park: true,
      gym: true,
      super_market: true,
      school: false,
    },
  },
  {
    block: 5,
    facilities: {
      park: false,
      gym: true,
      super_market: true,
      school: false,
    },
  },
];

const requirements = ["park", "gym", "super_market", "school"];

const findFacilityDistance = (facility, block, data) => {
  const availableBlocks = [];
  data.forEach((el) => {
    if (el.facilities[facility]) {
      availableBlocks.push(el.block);
    }
  });
  const distances = [];
  availableBlocks.forEach((el) => {
    let distance = +el - +block;
    if (distance < 0) {
      distance = -distance;
    }
    distances.push(distance);
  });
  return Math.min(...distances);
};

function findNearestBlocks(data, requirements) {
  const distances = {};
  data.forEach((el) => {
    distances[el.block] = 0;
    requirements.forEach((facility) => {
      distances[el.block] += findFacilityDistance(facility, el.block, data);
    });
  });
  const minimumDistance = Math.min(...Object.values(distances));
  return Object.keys(distances).filter(
    (key) => distances[key] === minimumDistance
  );
}
console.log("nearest blocks: ", findNearestBlocks(data, requirements));
// *************************************************
// ***************** BONUS TASK ********************
// *************************************************
// after you found the suitable block now.
//
// 1. we have an requirement array that contain the requirement facilities in it (it could be change)
//    from now on we have the requirement array which will calculate the suitable block base on it
//
//    NOTICE :
//    requirement array may change so CODE DYNAMIC THAT GLOBALY WORKS.
//
// 2. we have new security object in our blocks that show us the crime level in that block
//    in object we have average theft , quantity of police and police cars.
//    let's add weight to each one
//    1-1. average_theft ==> W = -3
//    1-2. police_quantity ==> W = 2
//    1-3. police_cars ==> W = 5
//    1-4. calculate the security level
//
//    e.g
//    in block 1 average_theft is 5 ( add weight which is -3) = -15
//    in block 1 police_quantity is 5 ( add weight which is 2) = 10
//    in block 1 police_cars is 2 ( add weight which is 5) = 10
//    let calculate sercurity level is -15 + 10 + 10 = 5
//    SECURIRT_LEVEL at block 1 is 5
//    and so on
//
//    now found the suitable block which has the NEAREST DISTANCE from REQUIREMENT facilities with
//    HIGHT SECURITY LEVEL
//
// *************************************************
// *************************************************

const requirement = ["park", "gym", "super_market", "school"];

const newData = [
  {
    block: 1,
    facilities: {
      park: false,
      gym: false,
      super_market: false,
      school: true,
    },
    security: {
      average_theft: 5,
      police_quantity: 5,
      police_cars: 2,
    },
  },
  {
    block: 2,
    facilities: {
      park: true,
      gym: true,
      super_market: false,
      school: true,
    },
    security: {
      average_theft: 8,
      police_quantity: 2,
      police_cars: 1,
    },
  },
  {
    block: 3,
    facilities: {
      park: true,
      gym: false,
      super_market: false,
      school: false,
    },
    security: {
      average_theft: 3,
      police_quantity: 5,
      police_cars: 2,
    },
  },
  {
    block: 4,
    facilities: {
      park: true,
      gym: true,
      super_market: true,
      school: false,
    },
    security: {
      average_theft: 5,
      police_quantity: 5,
      police_cars: 2,
    },
  },
  {
    block: 5,
    facilities: {
      park: false,
      gym: true,
      super_market: true,
      school: false,
    },
    security: {
      average_theft: 1,
      police_quantity: 5,
      police_cars: 3,
    },
  },
];

const average_theft_weight = -3;
const police_quantity_weight = 2;
const police_cars_weight = 5;

function calculateSecurityLevel(data) {
  const blocksSecurities = {};
  data.forEach((el) => {
    blocksSecurities[el.block] =
      el.security.average_theft * average_theft_weight +
      el.security.police_cars * police_cars_weight +
      el.security.police_quantity * police_quantity_weight;
  });
  return blocksSecurities;
}

function findSecureBlock(data) {
  const securityLevel = calculateSecurityLevel(data);
  const nearestBlocks = findNearestBlocks(data, requirement);
  let mostSecureBlock = null;
  nearestBlocks.forEach((el) => {
    if (!mostSecureBlock) {
      mostSecureBlock = el;
    } else {
      if (securityLevel[mostSecureBlock] < securityLevel[el]) {
        mostSecureBlock = el;
      }
    }
  });
  return mostSecureBlock;
}
console.log("most secure block: ", findSecureBlock(newData));
