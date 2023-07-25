function Balance(){
    const useEffect = React.useEffect
    const [show, setShow] = React.useState(true)
    const [status, setStatus] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const {userBalance, setUserBalance} = React.useContext(UserContext)
    const {userName, setUsername} = React.useContext(UserContext)
    const { userEmail, setUserEmail } = React.useContext(UserContext)
    const updateBalance = JSON.parse(localStorage.getItem("usersBalance"))
    const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)

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

    function balanceCheck() {
        setUserBalance(updateBalance)
    }

useEffect(()=> {
    loginStatusCheck();
},[])
   useEffect(()=> {
    balanceCheck();
   }, [])
   if(localStorage.getItem('token')) {
    return(
        <Card
                bgcolor='primary'
                header = "BALANCE"
                status = {status}
                body = {show ? (
                    <>
                    <h3>{userName}, your Balance is:</h3> 
                    <h4 style={{color: "green", textShadow: '1px 1px #333', fontWeight: "bold", backgroundColor:'#ffffffb2', borderRadius: '10px', width: '80%', textAlign: 'center', fontSize: '2.5rem' }}>${updateBalance}</h4>
                    </>
                ): (
                    <>
                    <h3>{userName}, your Balance is: </h3>
                    <h4>${userBalance}</h4>
                    </>
                )}
              />
            
            )
   }
    else {
        window.location.assign('/')
    }
}