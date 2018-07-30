import * as React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Select, InputNumber, Radio, Modal, Button, Upload, Icon, Rate, Input } from 'antd';
import 'braft-editor/dist/braft.css';
import { FormComponentProps } from 'antd/lib/form';
import * as editorStyle from '../style/editor.css';
import { UploadFile } from 'antd/lib/upload/interface';
import axios from 'axios';

export interface EditorProps extends FormComponentProps {}

export interface EditorState {
	previewVisible: boolean;
	previewImage: string;
	fileList: UploadFile[];
}

const FormItem = Form.Item;
const Option = Select.Option;

class Editor extends React.Component<EditorProps, EditorState> {
	readonly state: EditorState = {
		previewVisible: false,
		previewImage: '',
		fileList: []
	};

	constructor(props: EditorProps) {
		super(props);
	}

	public handleCancel = () => this.setState({ previewVisible: false });

	public handlePreview = (file: { url?: string; thumbUrl?: string }) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});
	};

	public updateHandleChange = ({ fileList }: { fileList: EditorState['fileList'] }) => this.setState({ fileList });

	public handleSubmit = (e): void => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
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
	};

	public handleRawChange = (rawContent: string) => {
		console.log(rawContent);
	};

	public async uploadImage(defaultValue) {
		let fd: FormData = new FormData();
		fd.append('upload_file', defaultValue.file);
		console.log(defaultValue.file, fd);
		
		// let res  = await axios.post()
		let res = await axios({
			url: '/manage/product/richtext_img_upload.do',
			headers: { 
				'Content-Type': 'multipart/form-data' 
			},
			method: 'post',
			data: fd
		})
		console.log(res);
		
	}

	public render() {
		const editorProps: {} = {
			height: 500,
			contentFormat: 'html',
			initialContent: '<p>Hello World!</p>',
			onChange: this.handleChange,
			onRawChange: this.handleRawChange,
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
						<Input placeholder="请填入商品名称" />
					</FormItem>
					<FormItem {...formItemLayout} label="商品描述">
						<Input placeholder="请填入商品描述" />
					</FormItem>

					<FormItem {...formItemLayout} label="选择分类">
						{getFieldDecorator('select-multiple', {
							rules: [
								{ required: true, message: 'Please select your favourite colors!', type: 'array' }
							]
						})(
							<Select mode="multiple" placeholder="请选择分类">
								<Option value="red">Red</Option>
								<Option value="green">Green</Option>
								<Option value="blue">Blue</Option>
							</Select>
						)}
					</FormItem>

					<FormItem {...formItemLayout} label="商品售价">
						{getFieldDecorator('input-number')(<InputNumber min={0} />)}
						<span className="ant-form-text"> 元</span>
					</FormItem>
					<FormItem {...formItemLayout} label="商品库存">
						{getFieldDecorator('input-number')(<InputNumber min={0} />)}
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

export default Form.create()(Editor);
