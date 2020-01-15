import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import '../../styles/crime_timeline.css'
import { Card } from 'react-bootstrap'
// import CrimeReportPdf from './CrimeReportPdf';

class CrimeTimeline extends Component {
    constructor() {
        super()
        this.state = {
            timeline_data: [
                {
                    "title": "Mandan Quadruple Murder Investigation",
                    "summary": "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
                    "data": [

                        {
                            "date": "Monday, April 1, 2019 7:30 am",
                            "text": "911 call comes in and immediately referred to as a medical emergency. Shortly after, Mandan Police arrive on the scene at RJR Maintenance and Management in southeast Mandan. When officers arrived they found several people deceased inside the building."
                        },
                        {
                            "date": "9:00 am",
                            "text": "KX News arrives on the scene, and Police release first information that ‘multiple bodies were found."
                        },
                        {
                            "date": "5:00 pm",
                            "text": "Mandan Police Chief Jason Zeigler gives first Press Conference  Mandan Police say 3 adult males and 1 adult female were found deceased early Monday morning.Beyond that, police release very little information.Mandan Police announce there is no suspect in custody."
                        },
                        {
                            "date": "Tuesday, April 2, 2019 9:00 am",
                            "text": "Mandan Police say rumors that a fifth body has been found are untrue"
                        },
                        {
                            "date": "11:30 am",
                            "text": "Mandan Police call a second press conference and release the names of the victims.52-year-old Robert Fakler, one of the owners of RJR Maintenance and Management45-year-old Lois Cobb and 50-year-old William Cobb, a husband, and wife that both work for the business42-year-old Adam Fuehrer, also an RJR employee"
                        },
                        {
                            "date": "Wednesday, April 3, 2019 8:00 am",
                            "text": "RJR Maintenance and Management opens for business"
                        },
                        {
                            "date": "1:00 pm",
                            "text": "Mandan Police were actively searching an area behind the McDonald’s off of Memorial Highway near 3rd St. SE in Mandan. Police said they were searching for evidence in the area."
                        },
                        {
                            "date": "7:00 pm",
                            "text": "Mandan Police hold a third brief press conference to announce the 24-hour tipline (701) 667-3250. Police do not take any questions from the media."
                        },
                        {
                            "date": "Thursday, April 4, 2019 9:00 am",
                            "text": "Police Chief Ziegler says numerous leads have come in through the tip hotline in the past 24 hours.  "
                        },
                        {
                            "date": "9:30 am",
                            "text": "Family and funeral home announce Memorial Service plans for victims"
                        },
                        {
                            "date": "4:00 pm",
                            "text": "Source tells KX News that heavy police and BCI presence is taking place in Washburn, ND"
                        },
                        {
                            "date": "5:00 pm",
                            "text": "KX News is on the scene in Washburn, however, no Police or law enforcement would confirm any connection to the Mandan homicide case. BCI and McLean County authorities are stationed at Northview RV Park an RJR owned property in Washburn."
                        },
                        {
                            "date": "6:15 pm",
                            "text": "KX News confirms with Mandan law enforcement that there is a person of interest detained in the Mandan homicide case. Person of interest was reportedly pulled over in a pick-up truck about 3:00 pm in Washburn, ND."
                        }
                    ]
                },
                {
                    "title": "Mandan Quadruple Murder Investigation",
                    "summary": "The investigation into the brutal Mother’s Day murder of a former teacher in Aliquippa has gripped western Pennsylvania. Rachael DelTondo, 33, was gunned down in her mother’s driveway after getting ice cream with friends. Her 2016 rendezvous with a teenage student, and the on-and-off relationship with him, has deepened the intrigue surrounding the case.",
                    "data": [
                        {
                            "date": "February 2016",
                            "text": " Police find DelTondo and Aliquippa Senior High School student Sheldon Jeter Jr., who was 17 at the time, in a steamed-up car parked in the lot of a former hospital around 2 a.m. They told police they were “talking” and were just “friends,” according to a police report that leaked in fall of 2016. No one was charged and DelTondo drove home."
                        },
                        {
                            "date": "October 2017",
                            "text": "DelTondo and her fiancé, Frank Catroppa, call off their wedding."
                        },
                        {
                            "date": "November 2017",
                            "text": "The police report on the February 2016 incident leaks. Jeter’s mother tells Channel 11 she was never notified about the incident. PA Cyber Charter School, where DelTondo was working at the time of the leak, suspends DelTondo with pay."
                        },
                        {
                            "date": "May 13, 2018",
                            "text": "DelTondo goes out for ice cream at Hank’s Custard in New Brighton with two friends, one of them Jeter’s older half-brother Tyrie. After being dropped off at her mother’s house, she is shot to death in the driveway on Buchanan Drive. She was shot at least 10 times."
                        },
                        {
                            "date": "May 14, 2018",
                            "text": "Police interview Jeter, now 20, who denies having anything to do with DelTondo’s shooting, saying the two were still friends. Police seize Jeter’s cell phone, believing he had texted DelTondo minutes before the shooting, according to a search warrant.The warrant also details a text conversation Jeter had with his brother that night while the group was getting ice cream.Also, an Aliquippa police officer is taken off of the case because his daughter was with DelTondo before she was shot. The officer is on leave because of his daughter's critical role in the investigation as an eyewitness, not because of anything the officer did.He was also one of the two officers who found DelTondo in the car with Jeter."
                        },
                        {
                            "date": "May 15, 2018",
                            "text": "Sources say investigators believe the murder was a crime of passion, or jealousy."
                        },
                        {
                            "date": "May 16, 2018",
                            "text": "Catroppa tells Channel 11 he spoke with police about DelTondo’s murder, but that he had nothing to do with it. He told police he was with his current girlfriend the night of the shooting."
                        },
                        {
                            "date": "May 17, 2018",
                            "text": "Police return to Jeter’s home with a second search warrant, which says police were looking for a 9mm gun and any other firearms, ammunition, a hoodie, bloodstained clothing, written correspondence about or to DelTondo, notebooks, cellphones and computers.Police found no weapons or ammo, and seized only a few notebooks. Jeter also voluntarily handed over clothing he was wearing on Mother’s Day, although police paperwork indicates surveillance video from an unknown location on that day shows Jeter wearing different clothes.The warrant also states Jeter interviewed one of Jeter’s brothers, who told police he was involved in a relationship with DelTondo and she’d told him she was feeling scared and believed she was being followed.The brother detailed an incident three months ago when he was with DelTondo, telling detectives that Jeter Jr. had shown up, gotten out of his car, approached DelTondo and said, If my brother wasn't here, I would (blank) you up, according to police paperwork."
                        },
                        {
                            "date": "May 21, 2018",
                            "text": " A third search warrant is filed, asking to seize the Facebook account of an Aliquippa police officer's wife's Facebook page.Stephanie Watkins is the wife of the officer removed from the investigation because his teenage daughter was with DelTondo before the shooting.The warrant seeks access to Watkins’ Facebook account from two days before the murder to two days after. Detectives are looking for subscriber information including status updates, shares, friends and private messages, according to police paperwork."
                        },
                        {
                            "date": "May 22, 2018",
                            "text": "Channel 11 obtains three new search warrants filed by Aliquippa police, all focusing on Facebook accounts.Police want access to DelTondo's social media account, as well as Sheldon Jeter's, from May 11-15. The third Facebook account belongs to DelTondo's 17-year-old friend, possibly the last person to see DelTondo alive, who is the daughter of an Aliquippa police sergeant. Channel 11 learned police also seized the teenager's cellphone. Police said the teen dropped DelTondo off at her mother's house, then sent DelTondo a series of texts asking her to take a walk, and then said, i'm on my way.Minutes later, DelTondo was killed."
                        },
                        {
                            "date": "May 23, 2018",
                            "text": "A judge grants a request by Beaver County District Attorney David Lozier to seal all future search warrants in the DelTondo investigation."
                        },
                        {
                            "date": "June 6, 2018",
                            "text": "In a surprise move, Aliquippa Police Chief Don Couch was placed on administrative leave with pay during a city council meeting.The city solicitor said the move was a personnel issue and not related to the DelTondo murder investigation.I don't really think that will affect the investigation at all,he said."
                        },
                        {
                            "date": "June 8, 2018",
                            "text": "Assistant Police Chief Joseph Perciavalle is charged with distributing sexually explicit material to a 17-year-old girl.Perciavalle had been leading the department after Chief Don Couch was placed on leave.The girl in question is the daughter of an Aliquippa police sergeant. She is also one of the last people to see Rachael DelTondo alive the night she was killed."
                        },
                        {
                            "date": "June 11, 2018",
                            "text": "Capt. Robert Sealock takes over as acting chief of the Aliquippa Police Department, the third person to hold the job in less than a week.Chief Don Couch was put on paid leave over personnel issues, then a day later, acting Chief Joseph Perciavalle was arrested for allegedly texting a sexually explicit video to a 17-year-old."
                        },
                        {
                            "date": "June 12, 2018",
                            "text": "Channel 11 confirmed through multiple sources an inmate received a handwritten letter describing details about the night of the murder and it was signed by someone police have interviewed.The specific content of the letter was not released, but sources say it's two pages long and claims to have pertinent information about DelTondo's murder.Sources say the letter was signed, but won't say by whom."
                        },
                        {
                            "date": "June 14, 2018",
                            "text": "Capt. Robert Sealock removes the department from the murder investigation. In a letter, he said his department would instead be focusing on other investigations and keeping people safe.Beaver County detectives will take over the investigation."
                        },
                        {
                            "date": "July 9, 2018",
                            "text": "A plea deal has been reached for a possible witness in the investigation.Wayne Cordes, an inmate in the Beaver County Jail, was facing 15 counts including felony aggravated assault from a robbery and beating incident in Aliquippa. As part of his plea deal, he must give truthful testimony regarding the DelTondo case at any and all court hearings.Cordes allegedly received a letter while in jail that contained details of the DelTondo murder."
                        },
                        {
                            "date": "July 10, 2018",
                            "text": "An Aliquippa assistant police chief previously charged with distributing sexually explicit material to a 17-year-old girl faces new charges.Joseph Perciavalle, currently suspended from the police department, turned himself in on charges of intercepting communications According to a criminal complaint, he is accused of secretly recording a 39-minute conversation between himself and Police Chief Donald Couch in which the two discussed the police department, the pension fund, several individuals and Aliquippa High School football.Couch is currently on paid administrative leave.The recording took place on March 2, the same day that state police executed a search warrant on the municipal offices."
                        },
                        {
                            "date": "July 11, 2018",
                            "text": "A letter allegedly detailing the murder of a former teacher in her mother’s Aliquippa driveway claimed the killer was a police officer, according to WPXI news partner TribLive.The letter to Wayne Cordes, an inmate at the Beaver County Jail, has been seized as evidence in the investigation into the May 13 death of Rachael DelTondo, 33, who was returning from a night out with friends when she was shot multiple times . Sources have told Channel 11 the letter contains details about the murder, but TribLive quoted District Attorney David Lozier as saying it was “allegedly written by somebody outside the jail and identified a police officer as having committed the homicide.”"
                        },
                        {
                            "date": "October 23, 2018",
                            "text": "Joe Perciavalle appeared in court, accused of sending a sexually explicit video to a minor.Perciavalle was acting Aliquippa police chief for a day before detectives arrested him. That minor is an Aliquippa police sergeant's daughter and a key witness in the DelTondo murder investigation. The minor was with DelTondo the night she was murdered.            Perciavalle's hearing was continued."
                        },
                        {
                            "date": "April 25, 2019",
                            "text": "The Beaver County District Attorney released a statement after nearly a year passed without the case being solved.District Attorney David Lozier said in his statement the investigation was still active. He asked for continued patience and cooperation as investigators continued their work. Lozier said he sympathized with the DelTondo family's deep sense of loss. He said his office was committed to bringing her murderer to justice."
                        },
                        {
                            "date": "May 6, 2019",
                            "text": "To many people in Aliquippa, the anniversary of Rachael DelTondo's murder was shocking. Channel 11 sat down with two attorneys who represented the only two people publicly questioned in the case.    It's hard to believe it's been almost a year, said attorney Steve Colafella, who represented DelTondo's ex-fiance Frank Catroppa.Attorney Mike Santicola is on retainer for the other man prominent in this case, Sheldon Jeter.We feel bad for the victim, the family, the community, said attorney Mike Santicola. Everybody waiting to find out if they're ever going to be able to solve this case.Santicola said his client had nothing to do with the case. Detectives filed search warrants on Jeter, looking for a gun, ammunition or bloody clothes at his home and in his phone. Jeter has never been named a suspect in the investigation."
                        },
                        {
                            "date": "May 10, 2019",
                            "text": "Channel 11 uncovered new details about alleged corruption in the Aliquippa Police Department.  Steve Townsend, attorney for Joe Perciavalle, the former police chief, said his client had been working with several agencies for more than year to uncover corruption. Townsend said Perciavalle had numerous meetings with agents from the Pennsylvania Attorney General's office."
                        }, {
                            "date": "May 20, 2019",
                            "text": "Sheldon Jeter, linked to the Rachael DelTondo investigation, was found unconscious along an Aliquippa road early Sunday morning.Police said Jeter was found just before 4 a.m. in the area of Sheffield Avenue and Orchard Street. Fire officials who responded revived him with Narcan.Jeter was found by police in a steamed up car with DelTondo back in 2016 when he was just 17 years old. Jeter's older brother was supposedly one of two friends with DelTondo an hour before she was murdered.Jeter's mother told Channel 11 her son does not use drugs, and has been slandered and harassed for over a year."
                        }
                    ]
                }
            ]
        }
    }

    render() {
        let timelineData = this.state.timeline_data[Math.floor(Math.random() * (1 - 0 + 1) + 0)]
        console.log("timelineData=",timelineData)
        if (timelineData  && timelineData.summary && timelineData.data.length) {
            return (
                <Fragment>
                    <br />
                    <p>{timelineData.summary}</p>
                    <ul class="timeline">
                        {timelineData.data.map(time => <li>
                            <Card>
                                <Card.Title>
                                    {time.date}
                                </Card.Title>
                                <Card.Text>
                                    {time.text}
                                </Card.Text>
                            </Card>
                        </li>)}
                    </ul>
                    <br/>
                    <hr/>
                    <h5>Crime Report</h5>
                    {/* <CrimeReportPdf/> */}
                </Fragment>
            )
        }else{
            return <div></div>
        }
    }
}



const mapStateToProps = (state) => ({
    crime: state.crimeReducer.crime,
    crime_loading: state.crimeReducer.crime_loading,
})

export default connect(mapStateToProps, null)(CrimeTimeline)
