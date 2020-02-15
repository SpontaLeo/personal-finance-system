import './RecordEditor.scss';

import BraftEditor from 'braft-editor';
import React from 'react';

interface RecordEditorProps {}

interface RecordEditorState {
  editing: boolean;
}

export default class RecordEditor extends React.Component<
  RecordEditorProps,
  RecordEditorState
> {
  state = {
    editing: false,
  };

  render() {
    return <BraftEditor />;
  }
}
