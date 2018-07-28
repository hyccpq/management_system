import * as React from 'react';
import Editor from '../components/editor';

export interface ProductEditorProps {}

export interface ProductEditorState {}

export default class ProductEditor extends React.Component<ProductEditorProps, ProductEditorState> {
	constructor(props: ProductEditorProps) {
		super(props);
	}

	public render() {
		return (
			<div>
				<Editor />
			</div>
		);
	}
}
