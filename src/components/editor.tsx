import * as React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

export interface EditorProps {}

export interface EditorState {}

export default class Editor extends React.Component<EditorProps, EditorState> {
	readonly state = {};

	constructor(props: EditorProps) {
		super(props);
    }
    
    public handleChange = (content: string) => {
        console.log(content);
    }

    public handleRawChange = (rawContent: string) => {
        console.log(rawContent);
    }

	public render() {
		const editorProps: {} = {
			height: 500,
			contentFormat: 'html',
			initialContent: '<p>Hello World!</p>',
			onChange: this.handleChange,
			onRawChange: this.handleRawChange
		};
		return (
			<div>
				<BraftEditor {...editorProps} />
			</div>
		);
	}
}
