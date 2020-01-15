import React from 'react'
import {Button,ButtonToolbar} from 'react-bootstrap'

export default function NewsTimeLine(props) {
    return (
        <div className="news_timeline">
            <h3 className="pull-left">{props.title?props.title:'Most Viewed Posts'}</h3>
                
                <br/>
          
            <br/>
            <ul class="timeline">
				<li>
					<a target="_blank" href="https://www.totoprayogo.com/#">New Web Design</a>
					<a href="#" class="float-right">21 March, 2014</a>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula....</p>
				</li>
				<li>
					<a href="#">21 000 Job Seekers</a>
					<a href="#" class="float-right">4 March, 2014</a>
					<p>Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
				</li>
				<li>
					<a href="#">Awesome Employers</a>
					<a href="#" class="float-right">1 April, 2014</a>
					<p>Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla odio, tincidunt vitae nunc vitae, mollis pharetra velit. Sed nec tempor nibh...</p>
				</li>
			</ul>
             </div>
    )
}
