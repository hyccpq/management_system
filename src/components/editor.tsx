import * as React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Select, InputNumber, Modal, Button, Upload, Icon, Input } from 'antd';
import 'braft-editor/dist/braft.css';
import { FormComponentProps } from 'antd/lib/form';
import * as editorStyle from '../style/editor.css';
import { UploadFile } from 'antd/lib/upload/interface';
import axios, { AxiosResponse } from 'axios';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { productShowReq } from '../redux/actions';
import { withRouter, RouteComponentProps } from 'react-router';

export interface EditorProps
	extends FormComponentProps,
		ProductShowStateToProps,
		ProductDispatchToProps,
		RouteComponentProps<EditorProps> {
	title: string;
	productId: string;
}

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
	categornayId: string;
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
const Option = Select.Option;

class Editor extends React.Component<EditorProps, EditorState> {
	readonly state: EditorState = {
		previewVisible: false,
		previewImage: '',
		fileList: [],
		categornayId: '12',
		name: '',
		subtitle: '',
		mainImage: '',
		subImages: '',
		detail: '',
		price: '',
		stock: '',
		status: '',
		id: ''
	};

	constructor(props: EditorProps) {
		super(props);
	}

	async componentWillMount() {
		let hasNotParams = Object.keys(this.props.match.params).length;
		if (!hasNotParams) {
			return;
		}
		let { productId } = this.props.match.params;
		console.log(productId);
		try {
			await this.props.productShowReq(productId);
			console.log(this.props.productInfo);
			let info = this.props.productInfo;
			this.setState({
				categornayId: info.categoryId + '',
				name: info.name,
				subtitle: info.subtitle,
				mainImage: info.mainImage,
				subImages: info.subImages,
				detail: info.detail,
				price: info.price,
				stock: info.stock,
				status: info.status,
				id: info.id
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
		console.log(file);
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
				console.log(this.state.fileList, this.state.subImages);
			}
		} else if (file.status === 'uploading' || file.status === 'removed') {
			this.setState({
				fileList,
				subImages: fileList.map((item: UploadFile) => item.name).toString()
			});
			console.log(this.state.subImages);
		}
	};

	public handleSubmit = (e): void => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				values.subImages = this.state.subImages;
				(values.subImages = this.state.subImages.split(',')[0]), (values.detail = this.state.detail);
				console.log(values);
				
			}
		});
	};

	public normFile = (e) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	public handleChange = (content: string) => {
		console.log(content);
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
			console.log(res);
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

		const { getFieldDecorator } = this.props.form;

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
				<Form onSubmit={this.handleSubmit}>
					<FormItem {...formItemLayout} label="商品名称">
						<Input placeholder="请填入商品名称" value={this.state.name} />
					</FormItem>
					<FormItem {...formItemLayout} label="商品描述">
						{getFieldDecorator('subtitle', {
							initialValue: this.state.subtitle
						})(<Input placeholder="请填入商品描述" />)}
					</FormItem>

					<FormItem {...formItemLayout} label="选择分类">
						{getFieldDecorator('categornayId', {
							initialValue: this.state.categornayId
						})(
							<Select mode="multiple" placeholder="请选择分类">
								<Option value="red">Red</Option>
								<Option value="green">Green</Option>
								<Option value="blue">Blue</Option>
							</Select>
						)}
					</FormItem>

					<FormItem {...formItemLayout} label="商品售价">
						{getFieldDecorator('price', {
							initialValue: this.state.price
						})(<InputNumber min={0} />)}

						<span className="ant-form-text"> 元</span>
					</FormItem>
					<FormItem {...formItemLayout} label="商品库存">
						{getFieldDecorator('stock', {
							initialValue: this.state.stock
						})(<InputNumber min={0} />)}

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
								{fileList.length >= 3 ? null : uploadButton}
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
						<Button type="primary" htmlType="submit">
							Submit
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form.create()(Editor)));
