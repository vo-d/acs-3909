import HeaderStyle from '../styles/Header.module.css'

const Header = ()=>{
    const x = 5;
    return(
        <div>
            <h1 className='HeaderStyle.title'><span>WebDev</span> News</h1>
            <p>Keep up to date with latest web dev news</p>
            {/* <style jsx>
                {`
                .title{
                    color: ${x>3?'red':'blue'};
                }
                `}
            </style> */}
        </div>
    )
}

export default Header