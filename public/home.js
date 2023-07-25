function Home(){
    const useEffect = React.useEffect
    const {userName, setUsername }= React.useContext(UserContext)
    const { userBalance, setUserBalance }= React.useContext(UserContext)
    const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)
  
    function checkIfLoggedIn(){
        if(localStorage.getItem("token")){
            const firstLoginCheck = JSON.parse(localStorage.getItem("loggedIn"))
            setIsLoggedIn(firstLoginCheck)
        }
    }
    useEffect(() => {
        checkIfLoggedIn();
        if(isLoggedIn == true){
          const newUserName = window.localStorage.getItem('token')
          const parsedUserInfo = JSON.parse(newUserName)
          setUsername(parsedUserInfo.userName)
          setUserBalance(parsedUserInfo.userBalance.toFixed(2))
        }
      }, [isLoggedIn]);
      return(
        <Card 
        bgcolor='black'
        txtcolor='white'
        title = "WELCOME TO OKSANA'S BANK"
        text= "Your money is safe here. If you need customer support, please dial 888-8888-8888."
          body= {<img src='bank.svg' className='img-fluid' alt='responsive image'/>}
          
       />
      )
  }