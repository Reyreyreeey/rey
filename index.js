const express = require('express');
const app = express();
app.use(express.json());

const staffs = [
    {id: 1, staff_id: 1001, fullname: "Nami Swan"},
    {id: 2, staff_id: 1002, fullname: "Vivi Nefertari"},
    {id: 3, staff_id: 1003, fullname: "Sanji Vinsmoke"},
    {id: 4, staff_id: 1004, fullname: "Robin Nico"},
    {id: 5, staff_id: 1005, fullname: "Zoro Roronoa"},
    {id: 6, staff_id: 1006, fullname: "Luffy Monkey"},
    {id: 7, staff_id: 1007, fullname: "Usopp Yasopp"},
    {id: 8, staff_id: 1008, fullname: "Rebecca"},
    {id: 9, staff_id: 1009, fullname: "Chopper Tony Tony"},
    {id: 10, staff_id: 1010, fullname: "Carrot"},
    {id: 11, staff_id: 1011, fullname: "Law Trafalgar"},
    {id: 12, staff_id: 1012, fullname: "Bonney Jewelry"},
    {id: 13, staff_id: 1013, fullname: "Ace Portgas D."},
    {id: 14, staff_id: 1014, fullname: "Shirahoshi Otohime"},
    {id: 15, staff_id: 1015, fullname: "Brook Soul"},


];
//gets all the staffs
app.get(('/api/staff'), (req,res) =>{
    res.send(staffs);
});

//gets the specific staff with staff_id
app.get(('/api/staff/:id'), (req,res)=>{
    const staff = staffs.find(f=>f.staff_id===parseInt(req.params.id));
    if(!staff) res.status(404).send("The staff id you entered is not found!");
    res.send(staff);
});

//posts or adds new staff with minimum of 3 characters
app.post(('/api/staff'), (req,res)=>{
    if(!req.body.fullname|| req.body.fullname.length < 3){
        res.status(404).send('Fullname should not be empty or must be minimum of 3 characters!');
        return;
    }
    const newStaffId = staffs.length > 0 ? staffs[staffs.length - 1].staff_id + 1 : 1;
    const staff = {
    id: staffs.length + 1,
    staff_id: newStaffId,
    fullname: req.body.fullname
    };

    staffs.push(staff);
    res.status(200).send('New Staff Added to the list!')

});

//updates employee
app.put(('/api/staff/:id'), (req,res) =>{
    const staff = staffs.find(f=>f.staff_id===parseInt(req.params.id));
    if(!staff){ 
        res.status(404).send("The staff id you entered is not found!")
        return;
    };
    staff.fullname = req.body.fullname;
    res.status(200).send('Updated Successfully!')
   
});

//delete's specific staff base on id
app.delete(('/api/staff/:id'), (req,res) =>{
    const staff = staffs.find(f=>f.staff_id===parseInt(req.params.id));
    if(!staff){ 
        res.status(404).send("The staff id you entered is not found!")
        return;
    };
    const index = staffs.indexOf(staff);
    staffs.splice(index, 1);

    res.status(200).send('Deleted Successfully!')

});

app.listen(3000, ()=> console.log("Port 3000!"));


/*

mkdir express-demo
npm init --yes
npm i express
npm i -g nodemon
nodemon index.js

*/