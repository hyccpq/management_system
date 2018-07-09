import * as React from 'react';
import { connect } from 'react-redux'

export interface IAppProps {
}

class IApp extends React.Component<IAppProps, any> {
  
  public render() {
    return (
      <div>
        
      </div>
    );
  }
}

const mapState2Props = state => {
  return {
  };
}

export default connect(mapState2Props)(IApp);
