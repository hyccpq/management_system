import * as React from 'react';
import BraftEditor from 'braft-editor';
import { Form, InputNumber, Modal, Button, Upload, Icon, Input } from 'antd';
import CategorySelect from '../components/categorySelect';
import 'braft-editor/dist/braft.css';
import * as editorStyle from '../style/editor.css';
import { UploadFile } from 'antd/lib/upload/interface';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { productShowReq } from '../redux/actions/productShow';
import { withRouter, RouteComponentProps } from 'react-router';
import { baseUrl } from '../conf/base';
import { ProductEditorProps } from '../page/productEditor';

export interface EditorProps extends ProductShowStateToProps, ProductDispatchToProps, RouteComponentProps<ProductEditorProps> {}

export interface ProductShowStateToProps {
	productInfo: any;
}

export interface ProductDispatchToProps {
	productShowReq: (productId: string) => {};
}

export interface EditorState {
	previewVisible: boolean;
	previewImage: string;
	fileList: UploadFile[];
	categoryId: number;
	parentCategoryId: number;
	name: string;
	subtitle: string;
	mainImage: string;
	subImages: string;
	detail: string;
	price: string;
	stock: string;
	status: string;
	id: string;
}

const FormItem = Form.Item;

class Editor extends React.Component<EditorProps, EditorState> {
	readonly state: EditorState = {
		previewVisible: false,
		previewImage: '',
		fileList: [],
		categoryId: 0,
		parentCategoryId: 0,
		name: '',
		subtitle: '',
		mainImage: '',
		subImages: '',
		detail: '',
		price: '0',
		stock: '0',
		status: '',
		id: ''
	};

	constructor(props: EditorProps) {
		super(props);
	}

	async componentDidMount() {
		try {
			let hasNotParams = Object.keys(this.props.match.params).length;
			if (!hasNotParams) {
				return;
			}
			let { productId } = this.props.match.params;
			await this.props.productShowReq(productId);
			console.warn(this.props.productInfo);
			let info = this.props.productInfo;
			let fileList = info.subImages
				? info.subImages.split(',').map((item) => {
						return {
							thumbUrl: baseUrl + item,
							url: baseUrl + item,
							uid: item,
							name: item,
							state: 'done'
						};
					})
				: [];
			this.setState({
				parentCategoryId: info.parentCategoryId,
				categoryId: info.categoryId,
				name: info.name,
				subtitle: info.subtitle,
				mainImage: info.mainImage,
				subImages: info.subImages,
				detail: info.detail,
				price: info.price,
				stock: info.stock,
				status: info.status,
				id: info.id,
				fileList
			});
		} catch (error) {
			console.log(error);
		}
	}

	public handleCancel = () => this.setState({ previewVisible: false });

	public handlePreview = (file: { url?: string; thumbUrl?: string }) => {
		console.log(file);
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});
	};

	public updateHandleChange = ({ file, fileList }: { file: UploadFile; fileList: EditorState['fileList'] }) => {
		if (file.status === 'done') {
			if (file.response.status === 0) {
				let newFileList = this.state.fileList;
				newFileList.pop();
				file.thumbUrl = file.url = file.response.data.url;
				file.name = file.response.data.uri;
				newFileList.push(file);
				this.setState({
					fileList: newFileList,
					subImages: newFileList.map((item: UploadFile) => item.name).toString()
				});
			}
		} else if (file.status === 'uploading' || file.status === 'removed') {
			this.setState({
				fileList,
				subImages: fileList.map((item: UploadFile) => item.name).toString()
			});
		}
	};

	public handleSubmit = (): void => {};

	public normFile = (e) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	public handleChange = (content: string) => {
		this.setState({
			detail: content
		});
	};

	public async uploadImage(defaultValue) {
		let fd: FormData = new FormData();
		fd.append('upload_file', defaultValue.file);
		try {
			let res: AxiosResponse = await axios({
				url: '/manage/product/richtext_img_upload.do',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: this._uploadImageProgress(defaultValue.progress),
				method: 'post',
				data: fd
			});
			if (res.data.success) {
				this._uploadImageSuccess(defaultValue.success)(res);
			}
		} catch (error) {
			this._uploadImageError(defaultValue.error);
		}
	}

	private _uploadImageProgress = (progress: Function) => (ev: ProgressEvent) => progress(ev.loaded / ev.total * 100);
	private _uploadImageError = (error: Function) => error({ msg: '上传出错' });
	private _uploadImageSuccess = (success: Function) => (res) => {
		success({
			url: res.data.file_path
		});
	};

	public formChange = (ev) => {
		console.log(ev);
	};

	public render() {
		const editorProps: {} = {
			height: 500,
			contentFormat: 'html',
			contentId: this.state.id,
			initialContent: this.state.detail,
			onChange: this.handleChange,
			media: {
				allowPasteImage: false, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
				image: true, // 开启图片插入功能
				video: false, // 开启视频插入功能
				audio: false, // 开启音频插入功能
				uploadFn: (params) => {
					this.uploadImage(params);
				} // 指定上传函数，说明见下文
			}
		};

		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 }
		};

		const { previewVisible, previewImage, fileList } = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">上传</div>
			</div>
		);

		return (
			<div>
				<Form>
					<FormItem {...formItemLayout} label="商品名称">
						<Input placeholder="请填入商品名称" value={this.state.name} />
					</FormItem>
					<FormItem {...formItemLayout} label="商品描述">
						<Input placeholder="请填入商品描述" value={this.state.subtitle} />
					</FormItem>

					<FormItem {...formItemLayout} label="选择分类">
						<CategorySelect categoryId={this.state.categoryId} parentCategoryId={this.state.parentCategoryId} />
					</FormItem>

					<FormItem {...formItemLayout} label="商品售价">
						<InputNumber min={0} value={parseFloat(this.state.price)} />
						<span className="ant-form-text"> 元</span>
					</FormItem>
					<FormItem {...formItemLayout} label="商品库存">
						<InputNumber min={0} value={parseInt(this.state.stock)} />

						<span className="ant-form-text"> 件</span>
					</FormItem>

					<FormItem {...formItemLayout} label="上传图片">
						<div className="clearfix">
							<Upload
								action="manage/product/upload.do"
								name="upload_file"
								listType="picture-card"
								fileList={fileList}
								withCredentials={true}
								onPreview={this.handlePreview}
								onChange={this.updateHandleChange}
							>
								{fileList.length >= 5 ? null : uploadButton}
							</Upload>
							<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
								<img alt="example" style={{ width: '100%' }} src={previewImage} />
							</Modal>
						</div>
					</FormItem>
					<FormItem {...formItemLayout} label="详细信息">
						<div className={editorStyle.editorSummery}>
							<BraftEditor {...editorProps} />
						</div>
					</FormItem>
					<FormItem wrapperCol={{ span: 12, offset: 6 }}>
						<Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
							提交
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state: AppState): ProductShowStateToProps => {
	return {
		productInfo: state.productShow
	};
};

const mapDispatchToProps: ProductDispatchToProps = {
	productShowReq
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Editor));
