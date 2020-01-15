import React from "react";

export default class InfinteScroll extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     
      loadingState: false
    };
  }

  componentDidMount() {
    this.refs.iScroll.addEventListener("scroll", () => {
      if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=this.refs.iScroll.scrollHeight){
        this.loadMoreItems();
      }
    });
  }

  displayItems() {
    var items = [];
    for (var i = 0; i < this.props.items; i++) {
      items.push(<li key={i}>Item {i}</li>);
    }
    return items;
  }

  loadMoreItems() {
    this.setState({ loadingState: true });
    setTimeout(() => {
      this.setState({ items: this.props.items + 10, loadingState: false });
    }, 3000);
  }

  render() {
    return (
      <div ref="iScroll" style={{ height: "200px", overflow: "auto" }}>
        <ul>
          {this.displayItems()}
        </ul>

        {this.state.loadingState ? <p className="loading"> loading More Items..</p> : ""}

      </div>
    );
  }
}
