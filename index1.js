let studentsData1 = [{
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

let schools1 = [{
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

const losers = [];


const sortedList = studentsData1.sort((a, b) => b.pts - a.pts);
schools1 = schools1.map(sch => ({ ...sch, admitted: [] }));

for (let student of sortedList) {
    for (let schId of student.preference) {
        const chosenSchool = schools1.find(school => school.id === schId);

        if (chosenSchool.admitted.length < chosenSchool.stsCount) {
            chosenSchool.admitted.push(student);
            student.admittedAt = chosenSchool.id;
            break;
        }
    }
    if(!student.admittedAt) {
        losers.push(student);
    }
}

console.log(schools1);

console.log(studentsData1.sort((a,b) => a.stId - b.stId));
console.log('losers', losers);