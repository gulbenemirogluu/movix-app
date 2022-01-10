import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
      <Menu.Item key="movies">
        <a href="/movies">Movies</a>
      </Menu.Item>
      <Menu.Item key="tv-series">
        <a href="/tv-series">TV Series</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu