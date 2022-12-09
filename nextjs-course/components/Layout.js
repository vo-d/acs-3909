import Nav from './Nav.js'
import Header from './Header.js'
import sytles from '../styles/Layout.module.css'
const Layout = ({children})=>{
    return( 
        <>
            <Nav />
            <div className={sytles.container}>
                <main className={sytles.main}>
                    <Header />
                    {children}
                </main>
            </div>
        </>
        
    )
}

export default Layout