const axios=require('axios')  ///by using axios its easy to send asynchrounous http request
var fs=require('fs')
const user=require("readline-sync")
axios.get('https://api.merakilearn.org/courses')
.then(response=>{
    meraki_data=response.data
    // console.log(response)
    file=JSON.stringify(meraki_data,null,3)
    // console.log(file)
    a=fs.writeFileSync("course1.json",file)
    // console.log(a)
    serial_no=0
    for(course_data of meraki_data){                  //loop for iterete name and id
        console.log(serial_no+1,course_data["name"],course_data["id"])
        serial_no++;
    }

    let user_input=user.questionInt("Enter the course id :-")   // user input for course and excercise
    console.log(meraki_data[user_input-1]["name"])
    let data1=(meraki_data[user_input-1]["id"])

    axios.get("https://api.merakilearn.org/courses/"+data1+"/exercises")
    .then(response=>{
        meraki_data1=response.data
        file1=JSON.stringify(meraki_data1,null,4)   ///stringify;-use for js object to json string
        b=fs.writeFileSync("course2.json",file1)      
        store=meraki_data1["course"]["exercises"]
        // console.log(store)
        no=0
        for(info in store){
            console.log(no+1,store[info]["name"])
            no++;

        }
        const que=user.questionInt("enter a number :-")
        let slug=store[que]["content"]
        console.log(slug)

        }).catch((syntax)=>{
            console.log(syntax)
        })

}).catch((error)=>{
    console.log(error)
})

