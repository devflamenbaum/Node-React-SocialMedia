import React, { useState, useEffect, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'

import { AuthContext } from '../../context/auth'

export default function Header() {

    let location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState('')

    useEffect(() =>{
      const { pathname } = location;
      const path = pathname === '/' ? 'home' : pathname.substr(1)
      setActiveItem(path)
    }, [location])

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    const headerBar = user ? (
      <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            active
            name={user.username}
            as={Link}
            to='/'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={logout}
            />
          </Menu.Menu>
        </Menu>
    ) : (
      <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />

          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as={Link}
              to='/login'
            />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </Menu>
    )


    return headerBar;
}
