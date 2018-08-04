import * as React from 'react';
import { categoryReq } from '../redux/actions/category';
import { Select } from 'antd';
// import * as editorStyle from '../style/editor.css';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { withRouter, RouteComponentProps } from 'react-router';
import { ProductEditorProps } from '../page/productEditor';
import { resolve } from 'path';
import { rejects } from 'assert';

export interface CategorySelectProps
	extends CategoryDispatchToProps,
		CategoryStateToProps,
		RouteComponentProps<ProductEditorProps> {
	categoryId: number;
	parentCategoryId: number;
	changeCategory: (parentCategoryId: number, categoryId: number) => void;
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
	firstDisable: boolean;
}

const Option = Select.Option;

const sleep = (time: number): Promise<{}> => new Promise((resolve: {}, reject) => {
	setTimeout(resolve, time);
})
class CategorySelect extends React.Component<CategorySelectProps, CategorySelectState> {
	readonly state: CategorySelectState = {
		firstCategoryAll: [],
		secondCategoryAll: [],
		firstValue: '',
		firstCategoryId: 0,
		secondValue: '',
		secondCategoryId: 0,
		firstDisable: true
	};

	constructor(props: CategorySelectProps) {
		super(props);
	}

	async componentDidMount() {
		try {
			await this.props.categoryReq();
			if (!Object.keys(this.props.match.params).length || !this.props.categoryId) {
				this.setState({
					firstCategoryAll: this.props.categoryInfo,
					firstDisable: false
				})
				return;
			}
			this.setState(
				{
					firstCategoryAll: this.props.categoryInfo,
					firstCategoryId: this.props.parentCategoryId,
					secondCategoryId: this.props.categoryId,
					firstDisable: false
				},
				this.getSecondAll
			);
		} catch (error) {
			console.log(error);
		}
	}

	private async getSecondAll() {
		try {
			if (this.state.firstCategoryId === 0) {
				this.setState(
					{
						firstCategoryId: this.props.categoryId,
						firstCategoryAll: this.props.categoryInfo
					},
					this.getSecondAll
				);
			} else {
				await this.props.categoryReq(this.state.firstCategoryId);
				if(this.state.secondCategoryAll.length)return;
				this.setState({
					secondCategoryAll: this.props.categoryInfo
				}, this.toParentCategory);
			}
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

	private async toParentCategory() {	
		await sleep(0);
		this.props.changeCategory(this.state.firstCategoryId, this.state.secondCategoryId);
	}

	private handleSecondSelectChange = (value: number, target) => {
		this.setState({
			secondCategoryId: value,
			secondValue: target.props.children,
		}, this.toParentCategory);
		
	};

	public render() {
		let {
			firstValue,
			firstCategoryAll,
			firstCategoryId,
			secondCategoryAll,
			secondCategoryId,
			secondValue,
			firstDisable
		} = this.state;
		return (
			<div>
				<Select
					showSearch
					placeholder="请选择分类"
					disabled={firstDisable}
					value={firstCategoryId ? firstCategoryId : ''}
					style={{ width: '50%' }}
					onChange={this.handleFirstSelectChange}
				>
					{firstCategoryAll.map((Item, index: number) => {
						return (
							<Option value={Item.id} key={index}>
								{Item.name}
							</Option>
						);
					})}
				</Select>
				{secondCategoryAll.length ? (
					<Select
						placeholder="请选择分类"
						value={secondCategoryId}
						style={{ width: '50%' }}
						onChange={this.handleSecondSelectChange}
					>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategorySelect));
