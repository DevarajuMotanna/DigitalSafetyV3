import close_icon from'../../assets/cross_icon_black.svg';
import print_icon from '../../assets/print_icon_blue.svg';
import './popOver.css'


function PopOver() {
    return (

        <div className="popover main-wrapper create-new-work-permit">
            <div className="popover-header">
                <div className='title'>
                    Create New Work Permit
                </div>
                <div className='sub-titles-block'>
                    <div className='sub-titles'>
                        <div className='row'>
                            <div className='sub-heading'>Work Permit Number</div>
                            <div className='text number'>WP12345</div>
                        </div>
                        <div className='row'>
                            <div className='sub-heading'>Date</div>
                            <div className='text number'>Aug 01, 2023 02:00Pm </div>
                        </div>
                    </div>
                    <div className='row page-utilities'>
                        <span className='utility'>Day 1 Formats</span>
                        <span className='utility'>Day-2 Onward Formats</span>
                        <span className='utility with_icon'><img className='icon' src={print_icon} alt='print_icon'/><span>Print Report</span></span>
                    </div>
                </div>
            </div>
            <div className="popover-content">
                <div className='left-options'>
                    <div className='row'>
                        <span className='wizard active'><span className='wizard-number'>1</span>Permit Details</span>
                    </div>
                    <div className='row'>
                        <span className='wizard'><span className='wizard-number'>2</span>Checklist</span>
                    </div>
                    <div className='row'>
                        <span className='wizard'><span className='wizard-number'>3</span>Review</span>
                    </div>
                </div>
                <div className='right-content'>
                    <div className='tab1'>
                        <div className='wizard-title'><span className='wizard-number'>1</span>Permit Details</div>
                        <div className='new-work-permit-form'>
                            <form>
                                <div className='general-info-block'>
                                    <div className='row form-control'>
                                        <label htmlFor='permit-approval-id'>Permit Approval Id</label>
                                        <div className='form-input'>
                                            <input type='text' placeholder='Enter permit Id' name='permitApprovalId' id='permit-approval-id'/>
                                        </div>
                                    </div>
                                    <div className='row form-control'>
                                        <label htmlFor='type-of-work'>Type of work</label>
                                        <div className='form-input'>
                                            <select name="type-of-work" id="type-of-work">
                                                <option value="heighOrCovilOrExcavationWork">Heigh / Civil / Excavation Work</option>
                                                <option value="saab">Saab</option>
                                                <option value="mercedes">Mercedes</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row row-group'>
                                        <div className='form-control'>
                                            <label htmlFor='requiring-person-id'>Requiring person Id</label>
                                            <div className='form-input'>
                                                <input type='text' value={'12345'} disabled='true' name='requiring-person-id' id='requiring-person-id'/>
                                            </div>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='requiring-person-name'>Requiring person name</label>
                                            <div className='form-input'>
                                                <input type='text' value={'John Deo'} disabled='true' name='requiring-person-name' id='requiring-person-name'/>
                                            </div>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='department'>Department</label>
                                            <div className='form-input'>
                                                <input type='text' value={'SFTY-R'} disabled='true' name='department' id='department'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row row-group'>
                                        <div className='form-control'>
                                            <label htmlFor='company-loaction-number'>Company Location Number</label>
                                            <div className='form-input'>
                                                <input type='text' disabled='true' name='company-loaction-number' id='company-loaction-number'/>
                                            </div>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='location'>Location</label>
                                            <div className='form-input'>
                                                <input type='text' value={'Rontak'} disabled='true' name='location' id='location'/>
                                            </div>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='issuing-department'>Issuing Department</label>
                                            <div className='form-input'>
                                                <select name="issuing-department" id="issuing-department">
                                                    <option value="heighOrCovilOrExcavationWork">SFTY-R</option>
                                                    <option value="saab">Saab</option>
                                                    <option value="mercedes">Mercedes</option>
                                                    <option value="audi">Audi</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='validaity-block'>
                                    <div className='block-title'>VALIDITY</div>
                                    <div className='row form-control'>
                                        <label htmlFor='job-description'>Job Description</label>
                                        <div className='form-input'>
                                            <textarea id="job-description" name="job-description" rows="5" cols="70"></textarea>
                                        </div>
                                    </div>
                                    <div className='row row-group'>
                                        <div className='form-control'>
                                            <label htmlFor='job-superior-id-number'>Job Superior Id number</label>
                                            <div className='form-input'>
                                                <input type='text' name='job-superior-id-number' id='job-superior-id-number'/>
                                            </div>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='job-superior-name'>Job Superior Name</label>
                                            <div className='form-input'>
                                                <input type='text' value={'John Deo'} disabled='true' name='job-superior-name' id='job-superior-name'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row row-group'>
                                        <div className='form-control'>
                                            <label htmlFor='coordinator-id-number'>Issuing Dept. Safety Coordinator ID Number </label>
                                            <div className='form-input'>
                                                <input type='text' name='coordinator-id-number' id='coordinator-id-number'/>
                                            </div>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='coordinator-name'>Issuing Dept. Safety Coordinator ID Name</label>
                                            <div className='form-input'>
                                                <input type='text' value={'John Deo'} disabled='true' name='coordinator-name' id='coordinator-name'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row row-group'>
                                        <div className='form-control'>
                                            <label htmlFor='contract-id-number'>Contract Id Number</label>
                                            <div className='form-input'>
                                                <input type='text' name='contract-id-number' id='contract-id-number'/>
                                            </div>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor='contract-id-name'>Contract Id Name</label>
                                            <div className='form-input'>
                                                <input type='text' value={'John Deo'} disabled='true' name='contract-id-name' id='contract-id-name'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='checkbox-block'>
                                    <input type='checkbox' id='check-sheet' name='check-sheet'/> <label htmlFor='check-sheet'>Excavation and Pipe Line Cable Laying Check Sheet</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='tab2'>
                        <div className='wizard-title'><span className='wizard-number'>2</span>Checklist</div>
                        <div className='new-work-permit-form'>
                            <form className='top-options-form'>
                                <h4>Equipment Details</h4>
                                <div className='row row-group'>
                                    <div className='form-control'>
                                        <label htmlFor='machine-equipment-id'>Machine Equipment Id</label>
                                        <div className='form-input'>
                                            <input type='text' placeholder='Enter Equiment Id' name='machine-equipment-id' id='machine-equipment-id'/>
                                        </div>
                                    </div>
                                    <div className='form-control'>
                                        <label htmlFor='equipment-name'>Name of Equiment</label>
                                        <div className='form-input'>
                                            <input type='text' placeholder='Enter Equipment name' name='equipment-name' id='equipment-name'/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <button type='button' className='btn btn-add-newequipment'>Add New Equipment</button>
                                </div>
                                <h4>Equipment & PPE</h4>
                                <ol>
                                <li>Are the welding/cutting set/equipment,accessories,PPE's(safety shoes, safety belts, face shield, goggles, helmet and leather gloves etc.) provided/used, ISI marked(if applies)/approved design/make?</li><input type="checkbox" ></input>

                                <li>Are all the items/equipment provided/in use been checked/verified and positioned at safe site?</li><input type="checkbox" ></input>

                                <li>Has the equipment checklist been filled and displayed at the site?</li><input type="checkbox" ></input>
                                <h4>Traininin & Instruction</h4>
                                <li> Is the person deputed for work skilled, trained and competent</li><input type="checkbox" ></input>
                                <li>IS th presence of trained fire volunteer ensured at the site?</li><input type="checkbox" ></input>
                                <li>Is place of first aid box conveyed to person engaged</li>
                                <h4>Fire Hazard</h4>
                                <li>Is flammable/combustible material removed and immovable flammable material covered by approved fire blanket without any gap?</li><input type="checkbox" ></input>
                                <li>Is fire blanket authenticated? Serial number of fire blanket?</li><input type="checkbox" ></input>
                                <li>Have adequate fire extinguisher/water buckets been ensured at the site?</li><input type="checkbox" ></input>
                                <li>Are chemicals to be used during the activity or chemicals present or likely to be present in workplace?</li><input type="checkbox" ></input>
                                <li>Are chemicals to be used during the activity or chemicals present or likely to be present in workplace?</li><input type="checkbox" ></input>
                                <li>Material Safety Data Sheet (MSDS) of respective chemicals attached with permit copy, necessary safety precautions given for respective chemicals in MSDS are implemented and the hazards & safety precautions given in MSDS are explained to the working crew?</li><input type="checkbox" ></input>
                                <li>Is emergency escape route defined and same is explained to working crew. Fill Emergency evacuation layout.</li><input type="checkbox" ></input>
                                </ol> 
                            </form>
                            <form>
                                <div className='checkbox-block'>
                                    <input type='checkbox' id='check-sheet' name='check-sheet'/> <label htmlFor='check-sheet'>Excavation and Pipe Line Cable Laying Check Sheet</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="popover-footer">
                <button className='btn footer-btn'>Exit</button>
                <button className='btn footer-btn next-btn'>Next</button>
            </div>
    {/*different dialog/popover start*/}
        <div className="popover main-wrapper">
            <div className="popover-header">
                <button className='btn close_btn'><img className="close_icon" src={close_icon} alt="close_icon" />Close</button>
            </div>
            <div className="popover-content">
                <div className='row work-permit-info'>
                    <div className='sub-heading'>Work Permit Number</div>
                    <div className='text number'>WP12345</div>
                </div>
                <div className='row work-permit-number-info'>
                    <div className='text number'>5647612345</div>
                </div>
                <div className='row map-block place-holder'>
                    
                </div>
                <div className='row'>
                    <div className='sub-heading'>Status</div>
                    <div className='status_key text'><span className='dot green'></span> High</div>
                </div>
                <div className='row d_flex'>
                    <div className='row'>
                        <div className='sub-heading'>Area</div>
                        <div className='text'>Building 5</div>
                    </div>
                    <div className='row'>
                        <div className='sub-heading'>Sub-Area</div>
                        <div className='text'>First floor seating area</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='sub-heading'>Work Date</div>
                    <div className='text'>First floor seating area</div>
                </div>
                <div className='row'>
                    <div className='sub-heading'>Permit type</div>
                    <div className='text'>First floor seating area</div>
                </div>
                <div className='row'>
                    <div className='sub-heading'>Work Permit Number</div>
                    <div className='text'>Hot / Height</div>
                </div>
                <div className='row d_flex'>
                    <div className='row'>
                        <div className='sub-heading'>Requiring Department</div>
                        <div className='text'>CVL -R</div>
                    </div>
                    <div className='row'>
                        <div className='sub-heading'>Issuing Department</div>
                        <div className='text'>CVL - R</div>
                    </div>
                </div>
                <div className='row'>
                    <div className='sub-heading'>KY Status</div>
                    <div className='text'>Update</div>
                </div>
                <div className='row'>
                    <div className='sub-heading'>Risk Category</div>
                    <div className='text red'>High</div>
                </div>
                <div className='row'>
                    <div className='sub-heading'>Check Sheet Status</div>
                    <div className='text'>Udapte</div>
                </div>
                <div className='row'>
                    <div className='sub-heading'>Attachment</div>
                    <div className='attachment'></div>
                </div>
            </div>
            <div className="popover-footer">

            </div>
        </div>
    {/*different dialog/popover end*/}
    </div>
        
    );
}

export default PopOver;
