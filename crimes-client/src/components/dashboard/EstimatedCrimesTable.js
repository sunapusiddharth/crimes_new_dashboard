import React, { Component } from 'react'
import { connect } from 'react-redux'

export class EstimatedCrimesTable extends Component {
    render() {
        return (
            <div>
                <div class="w3-container">
                    <h5>Crimes by states</h5>
                    <table class="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
                        <tr>
                            <td>United States</td>
                            <td>65%</td>
                        </tr>
                        <tr>
                            <td>UK</td>
                            <td>15.7%</td>
                        </tr>
                        <tr>
                            <td>Russia</td>
                            <td>5.6%</td>
                        </tr>
                        <tr>
                            <td>Spain</td>
                            <td>2.1%</td>
                        </tr>
                        <tr>
                            <td>India</td>
                            <td>1.9%</td>
                        </tr>
                        <tr>
                            <td>France</td>
                            <td>1.5%</td>
                        </tr>
                    </table><br />
                    <button class="w3-button w3-dark-grey">More Countries  <i class="fa fa-arrow-right"></i></button>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EstimatedCrimesTable)
