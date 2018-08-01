import * as React from 'react';
import { categoryReq } from '../redux/actions/category';
import { Select } from 'antd';
// import * as editorStyle from '../style/editor.css';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';

export interface CategorySelectProps extends CategoryDispatchToProps, CategoryStateToProps {
	categoryId: number;
	parentCategoryId: number;
}

export interface CategoryStateToProps {
	categoryInfo: any;
}

export interface CategoryDispatchToProps {
	categoryReq: (categoryId?: number) => {};
}

export interface CategorySelectState {
	firstCategoryAll: {
		id: number;
		name: string;
	}[];
	secondCategoryAll: {
		id: number;
		name: string;
	}[];
	firstValue: '';
	firstCategoryId: number;
	secondValue: '';
	secondCategoryId: number;
}

const Option = Select.Option;

class CategorySelect extends React.Component<CategorySelectProps, CategorySelectState> {
	readonly state: CategorySelectState = {
		firstCategoryAll: [],
		secondCategoryAll: [],
		firstValue: '',
		firstCategoryId: 0,
		secondValue: '',
		secondCategoryId: 0
	};

	constructor(props: CategorySelectProps) {
		super(props);
	}

	async componentDidMount() {
		try {
			await this.props.categoryReq();
			this.setState({
				firstCategoryAll: this.props.categoryInfo,
				firstCategoryId: this.props.parentCategoryId,
				secondCategoryId: this.props.categoryId
			}, this.getSecondAll)
		} catch (error) {
			console.log(error);
		}
	}

	private async getSecondAll() {
		try {
			await this.props.categoryReq(this.state.firstCategoryId);
			this.setState({
				secondCategoryAll: this.props.categoryInfo
			});
		} catch (error) {
			console.log(error);
		}
	}

	private handleFirstSelectChange = (value: number, target) => {
		this.setState(
			{
				firstValue: target.props.children,
				firstCategoryId: value,
				secondCategoryId: null
			},
			this.getSecondAll
		);
	};

	private handleSecondSelectChange = (value: number, target) => {
		this.setState({
			secondValue: target.props.children,
			secondCategoryId: value
		});
	};

	public render() {
		let { firstValue, firstCategoryAll, firstCategoryId, secondCategoryAll, secondCategoryId, secondValue } = this.state;
		return (
			<div>
				<Select placeholder="请选择分类" value={firstCategoryId} style={{width: '50%'}} onChange={this.handleFirstSelectChange}>
					{firstCategoryAll.map((Item, index: number) => {
						return (
							<Option value={Item.id} key={index}>
								{Item.name}
							</Option>
						);
					})}
				</Select>
				{secondCategoryAll.length ? (
					<Select placeholder="请选择分类" value={secondCategoryId} style={{width: '50%'}} onChange={this.handleSecondSelectChange}>
						{secondCategoryAll.map((Item, index: number) => {
							return (
								<Option value={Item.id} key={index}>
									{Item.name}
								</Option>
							);
						})}
					</Select>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): CategoryStateToProps => {
	return {
		categoryInfo: state.categoryList
	};
};

const mapDispatchToProps: CategoryDispatchToProps = {
	categoryReq
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelect);

