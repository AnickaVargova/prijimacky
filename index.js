let studentsData = [{
    stId: 1,
    pts: 30,
    preference: [1, 2]
  },
  {
    stId: 2,
    pts: 20,
    preference: [1, 3]
  },
  {
    stId: 3,
    pts: 3,
    preference: [1, 2]
  },
  {
    stId: 4,
    pts: 25,
    preference: [4, 1]
  },
  {
    stId: 5,
    pts: 15,
    preference: [2, 4]
  },
  {
    stId: 6,
    pts: 25,
    preference: [2, 1]
  },
  {
    stId: 7,
    pts: 30,
    preference: [4, 3]
  },
];

let schools = [{
    id: 1,
    stsCount: 2,
  },
  {
    id: 2,
    stsCount: 2,
  },
  {
    id: 3,
    stsCount: 2,
  },
  {
    id: 4,
    stsCount: 1,
  },
];

/* 
- make list of students interested in every school no matter what preference it is, sort them according to points
-function -  ask if the school is student's first preference, if so, find his second school, take out from the list, call the same function for the last student
- before second school's list is copied and modified, a property 'inProcess' of the school object  is set to true, after the list is replaced, the property is set to false. The recursive function is called only if the property is false, otherwise a timeout is called, the same function is called after 5 ms
- every time a list is modified, there is a global lastChange variable with a timestamp, there is an interval checking how long ago the lastChange was updated, if there has been no update for some time, the list is returned as the result
- if there are more than two possible preferences, the process is repeated for the second, third etc options
 */



const sortStudentsForSchool = (school) => {
  return studentsData.filter((student) => student.preference.includes(school.id)).sort((a, b) => b.pts - a.pts);
};

const modifyStudentsList = (schoolIndex,st) => {
    schools[schoolIndex].inProcess = true;
    const secondSchool = {...schools[schoolIndex]};
    let stIndex = secondSchool.interested.findIndex(student => student.stId === st.stId);
    if(stIndex >= 0) {secondSchool.interested = secondSchool.interested.toSpliced(stIndex, 1)};
    secondSchool.admitted = secondSchool.interested.slice(0, secondSchool.stsCount);
    secondSchool.inProcess = false;

    processStudent(secondSchool.admitted[secondSchool.admitted.length - 1], secondSchool);
    schools[schoolIndex] = secondSchool;
}

const modifyListWithTimeout = (secondSchoolIndex, st) => {
    if(schools[secondSchoolIndex] && !schools[secondSchoolIndex].inProcess) {
        modifyStudentsList(secondSchoolIndex, st);
       }
       else {
       setTimeout(() => {modifyListWithTimeout(secondSchoolIndex, st)}, 5);
       }
}

schools = schools.map(sch => ({...sch, interested: sortStudentsForSchool(sch), admitted: sortStudentsForSchool(sch).slice(0, sch.stsCount)}));

const processStudent = (st, sch) => {
  
    if (!st || !st.preference || st.preference[0] !== sch.id) {
        return;
    };
  
    const secondSchoolIndex = schools.findIndex(sch => !!st &&  sch.id === st.preference[1]);
   modifyListWithTimeout(secondSchoolIndex, st);
}


schools.map(school => school.admitted.map(student => processStudent(student, school)));
console.log(schools);
studentsData = studentsData.map(student => ({...student, admittedAt: schools.find(sch => sch.admitted.map(st => st.stId).includes(student.stId))?.id}));
console.log(studentsData);



