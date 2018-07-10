import * as React from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu, ItemGroup } = Menu;

export interface MyMenuProps {}

export interface State {
	current: string;
}

export default class MyMenu extends React.Component<MyMenuProps, State> {
	public state = {
		current: ''
	};

	constructor(props: MyMenuProps) {
		super(props);
    }
    
    public handleClick = (e) => {
        console.log(e.key)
        this.setState({
            current: e.key
        });
    }

	public render(): React.ReactNode {
		return (
			<Menu onClick={this.handleClick} selectedKeys={[ this.state.current ]} mode="horizontal">
				<Menu.Item key="mail">
					<Icon type="mail" />Navigation One
				</Menu.Item>
				<Menu.Item key="app" disabled>
					<Icon type="appstore" />Navigation Two
				</Menu.Item>
				<SubMenu
					title={
						<span>
							<Icon type="setting" />Navigation Three - Submenu
						</span>
					}
				>
					<ItemGroup title="Item 1">
						<Menu.Item key="setting:1">Option 1</Menu.Item>
						<Menu.Item key="setting:2">Option 2</Menu.Item>
					</ItemGroup>
					<ItemGroup title="Item 2">
						<Menu.Item key="setting:3">Option 3</Menu.Item>
						<Menu.Item key="setting:4">Option 4</Menu.Item>
					</ItemGroup>
				</SubMenu>
				<Menu.Item key="alipay">
					<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
						Navigation Four - Link
					</a>
				</Menu.Item>
			</Menu>
		);
	}
}
