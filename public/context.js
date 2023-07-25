const Route = ReactRouterDOM.Route
const Link = ReactRouterDOM.Link
const HashRouter = ReactRouterDOM.HashRouter
const UserContext = React.createContext(null)
const NavLink = ReactRouterDOM.NavLink


// const [userInfo, setUserInfo] = React.useState({name: "", email:"", password: "", balance: 0})
function Card(props){
    function classes(){
        const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white'
        return 'card mb-3' + bg + txt
    }
    return(
        <>
        <h1>{props.header}</h1>
        <div className={classes()} style={{maxWidth: "18rem"}}>
            {/* <div className="card-header" style={{fontSize: '3rem'}}>{props.header}</div> */}
            <div className="card-body">
                {props.title && (<h5 className='card-title' style={{fontSize: '1.4rem'}}>{props.title}</h5>)}
                {props.text && (<p className='card-text' style={{padding: '0px', marginLeft: '0px'}}>{props.text}</p>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}
            </div>
        </div>
        </>
    )
}