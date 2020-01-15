import React from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'


export default class SearchPeople extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            multiple: true,
            options: [],
            selectedUsers: []
        }
    }


    render() {
        return (
            <div>
                <AsyncTypeahead
                            {...this.state}

                            minLength={3}

                            onSearch={query => {
                                this.setState({ isLoading: true });
                                fetch(`https://api.github.com/search/users?q=${query}+in:login&page=1&per_page=40`)
                                    .then(resp => resp.json())
                                    .then(({ items, total_count }) => {
                                        console.log(items);
                                        const options = items.map((i) => ({

                                            id: i.id,
                                            label: i.login,
                                        }));
                                        return { options, total_count };
                                    })
                                    .then(({ options }) => {
                                        this.setState({
                                            isLoading: false,
                                            options
                                        });
                                    });
                            }}
                            options={this.state.options}

                            placeholder="Search for users"

                        />

                    </div>
        );
    }
}
