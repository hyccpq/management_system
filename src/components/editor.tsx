import * as React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Icon, Rate, Input } from 'antd';
import 'braft-editor/dist/braft.css';
import { FormComponentProps } from 'antd/lib/form';
import * as editorStyle from '../style/editor.css';

export interface EditorProps extends FormComponentProps {}

export interface EditorState {}

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Editor extends React.Component<EditorProps, EditorState> {
	readonly state = {};

	constructor(props: EditorProps) {
		super(props);
	}

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

	public render() {
		const editorProps: {} = {
			height: 500,
			contentFormat: 'html',
			initialContent: '<p>Hello World!</p>',
			onChange: this.handleChange,
			onRawChange: this.handleRawChange
		};

		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 14 }
		};
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
						<div className="dropbox">
							{getFieldDecorator('dragger', {
								valuePropName: 'fileList',
								getValueFromEvent: this.normFile
							})(
								<Upload.Dragger name="files" action="/upload.do">
									<p className="ant-upload-drag-icon">
										<Icon type="inbox" />
									</p>
									<p className="ant-upload-text">点击或者拖到此处上传</p>
									<p className="ant-upload-hint">Support for a single or bulk upload.</p>
								</Upload.Dragger>
							)}
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
