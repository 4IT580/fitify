import { slide as Menu } from 'react-burger-menu'


export function BurgerMenu() {
        return (
            <main className="burger-menu">
            <Menu>
                <a id="home" className="home-page" href="/">Home</a>
            </Menu>
            </main>
        );
    }