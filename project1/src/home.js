import { useEffect, useState } from "react"


const Home = () => {
    let [joblist, setJoblist] = useState([]);
   
    const getjob = () => {
        fetch("http://localhost:1234/jobapi?companyid")
            .then(response => response.json())
            .then(info => {
                setJoblist(info);
            })
    }

    useEffect(() => {
        getjob();
    });

    const apply = (job) => {
      if(localStorage.getItem("userid")==null){
             window.location.href = "#/login";
      }
      else{
        let url = "http://localhost:1234/userapi/" + localStorage.getItem("userid");
        
        fetch(url)
            .then(response => response.json())
            .then(userinfo => {
                  userinfo["jobid"] = job.id;
                  userinfo["companyid"] = job.companyid;
                console.log( userinfo);
               //apply start
                let url2 = "http://localhost:1234/applyapi/";
                let postdata = {
                  headers:{'Content-Type': 'application/json'},
                  method : 'post',
                  body:JSON.stringify(userinfo)
                  
                }
                fetch(url2, postdata)
                .then(response =>response.json())
                .then(info=>{
                  alert("Applied Successfully");
                })
               //apply end
            })
          }
    }
    let[keyword,setKeyword]=useState("");
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center"> {joblist.length} Recent Jobs </h2>
            <p> <input type="text" className="form-control" placeholder="Search jobs here" onChange={obj=>setKeyword(obj.target.value)}/></p>
                {
                    joblist.map((job, index) => {
                           if(job.jobtitle.toLowerCase().match(keyword.toLowerCase()) ||
                              job.exp.toLowerCase().match(keyword.toLowerCase()) || 
                              job.city.toLowerCase().match(keyword.toLowerCase()) ||
                              job.salary.toLowerCase().match(keyword.toLowerCase()) ||
                              job.skills.toLowerCase().match(keyword.toLowerCase()) ||
                              job.jd.toLowerCase().match(keyword.toLowerCase())  )
                       
                        return (
                            <div className="row mb-4"  key={index}>
                                <div className="col-xl-12">
                                    <div className="card border-0 shadow-lg">
                                        
                                        <div className="card-body">
                                            <div className="row">
                                              <h5 className="col-xl-12"> {job.jobtitle} </h5>
                                                <div className="col-xl-2 mb-2"> <i className="fa-solid fa-briefcase"></i> {job.exp} Yrs</div>
                                                <div className="col-xl-2 mb-2">  <i className="fa-solid fa-location-dot"></i> {job.city} </div>
                                                <div className="col-xl-1 mb-2"> <i className="fa-solid fa-indian-rupee-sign"></i> {job.salary} </div>
                                                <div className="col-xl-7 mb-2"><i className="fa-brands fa-github"></i>  Skills : {job.skills} </div>
                                                <div className="col-xl-12 mb-2"> <i className='fa-regular fa-file-lines'></i> Job Description : {job.jd} </div>
                                                <div> 
                                                  <button className="btn btn-primary btn-sm" onClick={apply.bind(this,job)}>
                                                       <i className="fa fa-edit"></i>Apply
                                                  </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            
        </div>
    )
}


export default Home;