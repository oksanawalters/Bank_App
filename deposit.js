function Deposit(){
    const useEffect = React.useEffect
    const [show, setShow] = React.useState(true)
    const [status, setStatus] = React.useState('')
    const [deposit, setDeposit] = React.useState('')
    const [disabled, setDisabled] = React.useState(true)
    const { isLoggedIn, setIsLoggedIn }= React.useContext(UserContext)
    const {userBalance, setUserBalance} = React.useContext(UserContext)
    const {userName, setUsername} = React.useContext(UserContext)
    const { userEmail, setUserEmail } = React.useContext(UserContext)
    const updateBalance = JSON.parse(localStorage.getItem("usersBalance"))

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
   }, [deposit])

    function validate(field, label){
        if (!field) {
            
            setStatus("Please enter numeric values only")
            setTimeout(() => setStatus(''), 5000) 
            return false; 
        }

        if (field < 0){
            setStatus(`Deposit amount must be higher than $0.00`)
            setTimeout(() => setStatus(''), 5000) 
            setDeposit('')
            return false
        }
        if (field == 0){
            setStatus(`Deposit amount must be higher than $0.00.`)
            setTimeout(() => setStatus(''), 5000) 
            setDeposit('')
            return false
        }

        return true;
    }
    if(isNaN(parseFloat(deposit)) && deposit !== '' && deposit !=='-' && deposit !=='.' && deposit !=='-.'){
        alert('Please enter numerical values only')
        setDeposit('')
    }

    function clearForm(){
        setDeposit('')
        setShow(true)
        setDisabled(true)

    }
    const handleDeposit = () =>{

        if (!validate(deposit, 'Please enter your deposit amount')) return;

        setShow(false)

        const url = `/account/deposit/${userEmail}/${deposit}`;
        (async () => {
            try {
              const res = await fetch(url, {
                method: 'POST'
              });
              if (res.status === 200) {
                const data = await res.json();
                localStorage.setItem("usersBalance", JSON.stringify(data.balance))
                setUserBalance(data.balance)
              } else {
                console.log('Login failed:', res.statusText);
  
              }
            } catch (error) {
              console.error('An error occurred during deposit:', error);
            }
          })();
        
    }
if(localStorage.getItem('token')){
    return(
        <Card
        bgcolor='success'
        header = "DEPOSIT"
        status = {status}
        body = {show ? (
            <>

<div style={{display: 'flex', gap: 20, justifyContent: 'space-between'}}>
            <h3 style={{ textShadow: '1px 1px #333'}}>Current Balance:</h3>
            <h3 style={{textShadow: '1px 1px #333', textAlign: 'right'}}>${userBalance}</h3>
            </div>

            <br/>
            <h3 style={{textShadow: '1px 1px #333'}}>Deposit Amount:</h3>
            <input type='text' className="form-control" id='withdraw' value={deposit} min='0' style={{textAlign: 'right', fontSize: '1.5rem'}} onChange={(e)=> {setDeposit(e.currentTarget.value)
            setDisabled(false)}}/><br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <button type='submit' className='btn btn-dark' disabled={disabled} onClick={handleDeposit} style={{ fontSize: '2.5rem'}}>Deposit</button>
            </div>
            </>
        ): (
            <>
            <h5>Success!</h5>
            <button type='submit' className='btn btn-dark' onClick={clearForm}>Make Another Deposit</button>
            </>
        )}
      
      />
    )
} else {
    window.location.assign('/')
}
}