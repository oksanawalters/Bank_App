
function NavBar() {
    const { userName, isLoggedIn, logOut } = React.useContext(UserContext)
    const useEffect = React.useEffect
      useEffect(() => {
      }, [isLoggedIn]);
    
    if(isLoggedIn === true){
      return (
        <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
            <div className="container-fluid">
              <div className='navbar-nav'>
              <NavLink className="navbar-brand" to="/" style={{ color: 'white', backgroundColor: 'transparent' }} id='mainPage'>Home</NavLink>
              </div>
              
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: '30%' }}>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Create a new account" className="nav-link" to="/CreateAccount" style={{ color: 'white' }}>Create Account</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Login to your account" className="nav-link" to="/login" style={{ color: 'white'}}>Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Make an account deposit"className="nav-link" to="/deposit" style={{ color: 'white'}}>Deposit</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Make a withdraw" className="nav-link" to="/withdraw" style={{ color: 'white'}}>Withdraw</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Check your balance" className="nav-link" to="/balance" style={{ color: 'white'}}>Balance</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Get a list of all users"className="nav-link" to="/alldata" style={{ color: 'white'}}>AllData</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Log out of your account"className="nav-link" to="/logout" style={{ color: 'white'}} onClick={logOut}>Log Out</NavLink>
                  </li>
                </ul>
                              {/* Display the userName in the top right corner */}
                              <span className="navbar-text" style={{ color: 'green', position: 'absolute', top: 0, right: 100, padding: '0.5rem', fontSize: '1.5rem' }}>
          {userName}
        </span>
              </div>
            </div>
          </nav>
        </>
      );
    } else {
      return (
        <>
          <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
            <div className="container-fluid">
              <div className='navbar-nav'>
              <NavLink className="navbar-brand" to="/" style={{ color: 'white', backgroundColor: 'transparent' }} id='mainPage'>Home</NavLink>
              </div>
              
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: '30%' }}>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Create a new account" className="nav-link" to="/CreateAccount" style={{ color: 'white' }}>Create Account</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-bs-toggle="tooltip" data-bs-placement="bottom" title="Login to your account" className="nav-link" to="/login" style={{ color: 'white'}}>Login</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      );
    }
    
    }
