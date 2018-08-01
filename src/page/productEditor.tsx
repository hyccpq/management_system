import * as React from 'react';
import Editor from '../components/editor';
import { RouteComponentProps } from '../../node_modules/@types/react-router';

export interface ProductEditorProps {
	productId: string;
}

export interface ProductEditorState {}

export default class ProductEditor extends React.Component<ProductEditorProps, ProductEditorState> {
	constructor(props: ProductEditorProps) {
		super(props);
	}

	public render() {
		return (
			<div>
				<h1>产品信息编辑</h1>
				<Editor />
			</div>
		);
	}
}
