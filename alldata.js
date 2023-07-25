function AllData(){
    const useEffect = React.useEffect
    const {userBalance, setUserBalance} = React.useContext(UserContext)
    const {userName, setUsername} = React.useContext(UserContext)
    const { userEmail, setUserEmail } = React.useContext(UserContext)
    const updateBalance = JSON.parse(localStorage.getItem("usersBalance"))
    const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)
      const [data, setData] = React.useState('')
      function loginStatusCheck () {
        if(localStorage.getItem('loggedIn')){
            const updatedLogin = JSON.parse(localStorage.getItem("loggedIn"))
              setIsLoggedIn(updatedLogin)
              const newUserName = window.localStorage.getItem('token')
              const parsedUserInfo = JSON.parse(newUserName)
              setUsername(parsedUserInfo.userName)
              setUserBalance(updateBalance)
              setUserEmail(parsedUserInfo.userEmail)
        }
    }
  
  useEffect(()=> {
    loginStatusCheck();
  },[])
      useEffect(()=> {
        fetch('/account/all')
          .then(response => response.json())
          .then(data => {
            setData(JSON.stringify(data))
          })
      })
      if(localStorage.getItem('token')){
      
      
      return(
          <>
          <h1>ALL DATA<br/>
         
          </h1>
          <div className="container"style={{maxWidth: '90%'}}>
          <table className="table table-dark table-striped">
    <thead>
      <tr>
        <th scope="col">All User Data</th>
        {/* <th scope="col">Name</th>
        <th scope="col">Password</th> */}
      
      </tr>
    </thead>
    <tbody>
     
          {/* { data.map((profile) =>  */}
               <tr>
               <td>{data}</td>
                  {/* <td>{profile.name}</td>
                  <td>{profile.email}</td>
                  <td>{profile.password}</td> */}
              </tr>
          {/* )} */}
  
      
    </tbody>
  </table>
          
  </div>
          </>
  
      )
  }  else {
  window.location.assign('/')
  }
  }