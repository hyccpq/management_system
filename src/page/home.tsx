import * as React from 'react';
import * as home from '../style/home.css';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { statistics } from '../redux/actions/statistic';
import { Link } from 'react-router-dom';

export interface HomeProps extends ReduxProps, ActionProps {}

export interface ReduxProps {
	statistic: TypeStatistic;
}

export interface TypeStatistic {
	userCount ?: number;
	productCount?: number; 
	orderCount?: number;
}

export interface ActionProps {
	getStatistics: () => {}
}


const mapStateToProps = (state: AppState): ReduxProps => {
	return {
		statistic: state.statistic
	}
}

const mapDispatchToProps: ActionProps = {
	getStatistics: statistics
}

class Home extends React.Component<HomeProps, any> {
	async componentDidMount () {
		await this.props.getStatistics()
	}

	public render() {
		let { statistic } = this.props
		
		return (
			<div>
				<h1>首页</h1>
				<ul className={home.numList}>
					<li className={home.numItem}>
						<Link to='/userinfo/index'>
							<p>{statistic.userCount ? statistic.userCount.toString() : '--'}</p>
							<h3>用户总数</h3>
						</Link>
					</li>
					<li className={home.numItem}>
						<p>{statistic.productCount ? statistic.productCount.toString() : '--'}</p>
						<h3>产品总数</h3>
					</li>
					<li className={home.numItem}>
						<p>{statistic.orderCount ? statistic.orderCount.toString() : '--'}</p>
						<h3>用户总数</h3>
					</li>
				</ul>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
