import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import classNames from 'classnames';
import Loader from 'react-loaders';
import {Radio, RadioGroup} from 'react-icheck';
import InputRange from 'react-input-range';
import DatePicker from 'react-datepicker';
import Avatar from 'react-avatar';
import {FaBullhorn, FaGroup, FaRefresh, FaCheck, FaCalendar, FaFacebookOfficial, FaThumbsUp, FaGlobe} from 'react-icons/lib/fa';
import MdPhotoLibrary from 'react-icons/lib/md/photo-library';
import MdPhoto from 'react-icons/lib/md/photo';

import { loadAgentGroups } from '../redux/actions/agentGroupActions';
import { loadAudiences } from '../redux/actions/audienceActions';
import { loadImageLibrary } from '../redux/actions/imageLibraryActions';
import { loadAdPreview, createCampaign } from '../redux/actions/campaignActions';

const budgetLimit = {daily: 1000, weekly: 10000, monthly: 100000};

@connect(
  state => ({user: state.auth.user, token: state.auth.token, campaigns: state.campaigns.list, preview: state.campaigns.preview, createLoading: state.campaigns.createLoading, createSuccess: state.campaigns.createSuccess, createError: state.campaigns.createError, agentGroups: state.agent_groups.list, audiences: state.audiences.list, imageLibrary: state.image_library.list}),
  {push, replace, loadAgentGroups, loadAudiences, loadImageLibrary, loadAdPreview, createCampaign}
)
export default class CampaignBuilder extends Component {
	constructor(props) {
		super(props);
    this.state = this.initialState();
    this.handleAction = this.handleAction.bind(this);
    this.startNewCampaign = this.startNewCampaign.bind(this);
    this.previewCampagin = this.previewCampagin.bind(this);
    this.goToHome = this.goToHome.bind(this);
	}

  initialState() {
    return {
      step: 0,
      goal: 'conversion',
      name: '',
      budgetType: 'daily',
      budgetAmount: 10,
      startDate: null,
      endDate: null,
      nameError: '',
      agentGroup: null,
      audience: null,
      pickedImage: '',
      headline: '',
      text: '',
      description: '',
      displayLink: '',
      agentGroupError: '',
      audienceError: '',
      pickedImageError: '',
      headlineError: '',
      textError: '',
      descriptionError: '',
      displayLinkError: ''
    };
  }

  componentDidMount() {
    const {token} = this.props;
    this.props.loadAgentGroups({token});
    this.props.loadAudiences({token});
    this.props.loadImageLibrary({token});
  }

  componentWillReceiveProps(newProps) {
    if(this.props.createLoading && !newProps.createLoading) {
      if(newProps.createSuccess) {
        this.setState({step: 4});
      } else if (newProps.createError) {
        alert("An error occurred while trying to create a campaign: \r\n" + newProps.createError.message);
      }
    }
  }

  onGoalChange(goal) {
    if (goal != this.state.goal) {
      this.setState({goal});  
    }
  }

  onAgentGroupChange(agentGroup) {
    if (!_.isEqual(agentGroup, this.state.agentGroup)) {
      this.setState({agentGroup, agentGroupError: ''})
    }
  }

  onAudienceChange(audience) {
    if (!_.isEqual(audience, this.state.audience)) {
      this.setState({audience})
    }
  }

  goToStep (step) {
    if (this.state.step < 4 && step < this.state.step) {
      this.setState({step});
    }
  }

  startNewCampaign(e) {
    this.setState(this.initialState());
  }

  previewCampagin(e) {
    const {token} = this.props;
    const {agentGroup, headline, text, description, displayLink, pickedImage} = this.state;
    this.props.loadAdPreview({token, agent_group_id: agentGroup.id, headline, text, description, display_link: displayLink, image_hash: pickedImage})
  }

  postCampagin() {
    const {token} = this.props;
    const {name, agentGroup, audience, goal, budgetType, budgetAmount, headline, text, description, displayLink, pickedImage} = this.state;
    this.props.createCampaign({
      token, 
      name, 
      agent_group_id: agentGroup.id, 
      audience_id: audience.id, 
      campaign_goal: 'conversion' /* goal */, 
      budget_scope: budgetType, 
      per_agent_budget: budgetAmount, 
      headline, 
      text, 
      description, 
      display_link: displayLink, 
      image_hash: pickedImage
    });
  }

  goToHome(e) {
    this.props.replace('/');
  }

  handleAction(e) {
    const {step, name, agentGroup, audience, pickedImage, headline, text, description, displayLink, nameError, agentGroupError, audienceError, headlineError, textError, descriptionError, displayLinkError} = this.state;
    let errors = {};
    switch(step) {
      case 0:
        if (!name) { Object.assign(errors, {nameError: '* Name is required.'}); }
        if (Object.keys(errors).length > 0) {
          this.setState(errors);
        } else {
          this.setState({step: 1});
        }
        break;
      case 1:
        if (!agentGroup) { Object.assign(errors, {agentGroupError: '* Agent Group is required.'}); }
        if (Object.keys(errors).length > 0) {
          this.setState(errors);
        } else {
          this.setState({step: 2});
        }
        break;
      case 2:
        if (!audience) { Object.assign(errors, {audienceError: '* Audience is required.'}); }
        if (Object.keys(errors).length > 0) {
          this.setState(errors);
        } else {
          this.setState({step: 3});
        }
        break;
      case 3:
        if (!pickedImage) { Object.assign(errors, {pickedImageError: '* Image is required.'}); }
        if (!headline) { Object.assign(errors, {headlineError: '* Headline is required.'}); }
        if (!text) { Object.assign(errors, {textError: '* Text is required.'}); }
        if (!displayLink) { Object.assign(errors, {displayLinkError: '* Display Link is required.'}); }
        if (Object.keys(errors).length > 0) {
          this.setState(errors);
        } else {
          this.postCampagin();
        }
        break;
      default:
        break;
    }
  }

  render() {
    const {step, goal, name, budgetType, budgetAmount, startDate, endDate, nameError} = this.state;
    let content = null;
    switch(step) {
      case 0:
        content = this.renderCampaignInfoBlock();
        break;
      case 1:
        content = this.renderAgentGroupBlock();
        break;
      case 2:
        content = this.renderAudienceBlock();
        break;
      case 3:
        content = this.renderAdBuilderBlock();
        break;
      case 4:
        content = this.renderConfirmBlock();
        break;
      default:
        break;
    }
    return (
      <div className="campaign-builder-page">
        {content}
        <div className="footer">
          <div className="steps">
            <a className={classNames('step-label', {active: step >= 0})} onClick={this.goToStep.bind(this, 0)}>CAMPAIN INFO &gt; </a>
            <a className={classNames('step-label', {active: step >= 1})} onClick={this.goToStep.bind(this, 1)}>AGENT GROUP &gt; </a>
            <a className={classNames('step-label', {active: step >= 2})} onClick={this.goToStep.bind(this, 2)}>AUDIENCE &gt; </a>
            <a className={classNames('step-label', {active: step >= 3})} onClick={this.goToStep.bind(this, 3)}>AD BUILDER &gt; </a>
            <a className={classNames('step-label', {active: step >= 4})}>CONFIRM </a>
          </div>
          {step < 4 && 
            <div className="next-section">
              <a className="step-label active" onClick={this.handleAction}>{step < 3 ? 'NEXT STEP' : 'CONFIRM'} &gt; </a>
            </div>
          }
          <div className="home-section">
            <a className="step-label active" onClick={(e) => this.props.push('/')}> &lt; HOME </a>
          </div>
        </div>
      </div>
    );
  }

  renderCampaignInfoBlock() {
    const {step, goal, name, budgetType, budgetAmount, startDate, endDate, nameError} = this.state;
    return (
      <div className="block campaign-info-block">
        <div className="section title-section">
          <p className="title">Welcome to the <span className="semi-bold">Campaign Builder</span></p>
          <p className="title-caption">Let us help you get started</p>
        </div>

        <div className="section goal-section">
          <div className="section-header">
            <p className="header-caption">What's the goal of your campaign?</p>
            <hr className="separator" />
          </div>
          <div className="icon-radio-group">
            <div className={classNames('icon-radio-button', 'shadowed', {hover: goal != 'awareness'})} style={{backgroundColor: '#64C6F2'}} onClick={this.onGoalChange.bind(this, 'awareness')}>
              <FaBullhorn className="icon" size={150} />
              <p className="label">awareness</p>
              {goal == 'awareness' && <p className="checkbox" style={{color: '#64C6F2'}}><FaCheck size={15} />&nbsp;&nbsp;SELECTED</p>}
            </div>
            <div className={classNames('icon-radio-button', 'shadowed', {hover: goal != 'engagement'})} style={{backgroundColor: '#1C5FAA'}} onClick={this.onGoalChange.bind(this, 'engagement')}>
              <FaGroup className="icon" size={150} />
              <p className="label">engagement</p>
              {goal == 'engagement' && <p className="checkbox" style={{color: '#1C5FAA'}}><FaCheck size={15} />&nbsp;&nbsp;SELECTED</p>}
            </div>
            <div className={classNames('icon-radio-button', 'shadowed', {hover: goal != 'conversion'})} style={{backgroundColor: '#F89635'}} onClick={this.onGoalChange.bind(this, 'conversion')}>
              <FaRefresh className="icon" size={150} />
              <p className="label">conversion</p>
              {goal == 'conversion' && <p className="checkbox" style={{color: '#F89635'}}><FaCheck size={15} />&nbsp;&nbsp;SELECTED</p>}
            </div>
          </div>
        </div>

        <div className="section name-section">
          <div className="section-header">
            <p className="header-caption">Name your campaign</p>
            <hr className="separator" />
          </div>
          <input className="text-input" type="text" placeholder="Name your campaign..." size={50} value={name} onChange={(e) => this.setState({name: e.target.value, nameError: ''})} />
          {nameError && <p className="error-text">{nameError}</p>}
        </div>

        <div className="section budget-section">
          <div className="section-header">
            <p className="header-caption">What's your budget?</p>
            <hr className="separator" />
          </div>
          <div className="budget-wrapper">
            <div className="budget-type">
              <RadioGroup name="radio" value={budgetType} onChange={(e) => this.setState({budgetType: e.target.value})}>
                <Radio className="radio-button" value="daily" radioClass="iradio_square-blue" increaseArea="20%" label={`<span class="${classNames({active: budgetType == 'daily'})}">  DAILY BUDGET</span>`} />
                <Radio className="radio-button" value="weekly" radioClass="iradio_square-blue" increaseArea="20%" label={`<span class="${classNames({active: budgetType == 'weekly'})}">  WEEKLY BUDGET</span>`} />
                <Radio className="radio-button" value="monthly" radioClass="iradio_square-blue" increaseArea="20%" label={`<span class="${classNames({active: budgetType == 'monthly'})}">  MONTHLY BUDGET</span>`} />
              </RadioGroup>
            </div>
            <div className="budget-amount">
              <p className="amount-label"><span>{`${budgetType} budget: `}</span><span className="amount-value">&nbsp;&nbsp;&nbsp;{`${numeral(budgetAmount).format('$0,0.00')}`}</span></p>
              <InputRange maxValue={budgetLimit[budgetType]} minValue={0} value={budgetAmount} onChange={(c, val) => this.setState({budgetAmount: val})} />
            </div>
          </div>
        </div>

        <div className="section budget-section">
          <div className="section-header">
            <p className="header-caption">How long should this campaign run?</p>
            <hr className="separator" />
          </div>
          <div className="date-picker-group">
            <div className="date-picker-wrapper">
              <p className="date-picker-label">Start Date</p>
              <DatePicker className="text-input" selected={startDate} placeholderText="MM/DD/YYYY" onChange={(date) => this.setState({startDate: date})} />
              <FaCalendar className="calendar-icon" size={20} />
            </div>
            <div className="date-picker-wrapper">
              <p className="date-picker-label">End Date</p>
              <DatePicker className="text-input" selected={endDate} placeholderText="MM/DD/YYYY" onChange={(date) => this.setState({endDate: date})} />
              <FaCalendar className="calendar-icon" size={20} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAgentGroupBlock() {
    const {agentGroups} = this.props;
    const {agentGroup, agentGroupError} = this.state;
    return (
      <div className="block agent-group-block">
        <div className="section title-section">
          <p className="title">Agent Group</p>
        </div>

        <div className="section agent-group-section">
          <div className="section-header">
            <p className="header-caption">Pick your agent group</p>
            <hr className="separator" />
          </div>
          {_.chunk(agentGroups, 2).map((g, i) => {
            return (
              <div key={`tick-radio-group-${i}`} className="tick-radio-group">
                {g.map((e, j) => {
                  const isSelected = _.isEqual(agentGroup, e);
                  return (
                    <div key={`tick-radio-button-${i}-${j}`} className={classNames('tick-radio-button', 'shadowed', {hover: !isSelected})} onClick={this.onAgentGroupChange.bind(this, e)}>
                      <p className="title">{e.name}</p>
                      <p className="desc">{`${e.count} agents`}</p>
                      {isSelected && <div className="checkbox"><FaCheck size={20} /></div>}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {agentGroupError && <p className="error-text">{agentGroupError}</p>}
        </div>
      </div>
    );
  }

  renderAudienceBlock() {
    const {audiences} = this.props;
    const {audience, audienceError} = this.state;
    return (
      <div className="block audience-block">
        <div className="section title-section">
          <p className="title">Audience</p>
        </div>

        <div className="section audience-section">
          <div className="section-header">
            <p className="header-caption">Select your target audience</p>
            <hr className="separator" />
          </div>
          {_.chunk(audiences, 2).map((g, i) => {
            return (
              <div key={`tick-radio-group-${i}`} className={classNames('tick-radio-group', {half: g.length == 1})}>
                {g.map((e, j) => {
                  const isSelected = _.isEqual(audience, e);
                  return (
                    <div key={`tick-radio-button-${i}-${j}`} className={classNames('tick-radio-button', 'shadowed', {hover: !isSelected})} onClick={this.onAudienceChange.bind(this, e)}>
                      <p className="title large">{e.name}</p>
                      <p className="desc uppercase lighten">{`${e.gender.join(' AND ')}`} &bull; {`AGE BETWEEN ${e.min_age}-${e.max_age}`}</p>
                      {isSelected && <div className="checkbox"><FaCheck size={20} /></div>}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {audienceError && <p className="error-text">{audienceError}</p>}
        </div>
      </div>
    );
  }

  renderAdBuilderBlock() {
    const {imageLibrary, preview, createLoading} = this.props;
    const {pickedImage, headline, text, description, displayLink, pickedImageError, headlineError, textError, descriptionError, displayLinkError} = this.state;
    return (
      <div>
        <div className="title-block shadowed">
          <div className="title-section">
            <p className="title">Ad Builder</p>
          </div>
          {createLoading && <Loader type="ball-pulse" />}
        </div>
        <div className="block ad-block" style={{backgroundColor: 'transparent'}}>
          <div className="ad-builder-section shadowed">
            <p className="title dark-blue" style={{marginBottom: '50px'}}>Customize the look of your ad.</p>
            <div className="tick-radio-group">
              <div className={classNames('tick-radio-button', 'shadowed')} style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <p className="title center-align" style={{fontSize: '14pt'}}><MdPhoto size={30} /> <span style={{verticalAlign: 'middle'}}> SINGLE IMAGE</span></p>
                <div className="checkbox"><FaCheck size={20} /></div>
              </div>
            </div>
            <div className="tick-radio-group" style={{marginBottom: '50px'}}>
              <div className={classNames('tick-radio-button', 'shadowed', 'disabled')} style={{paddingTop: '20px', paddingBottom: '20px'}}>
                <p className="title center-align" style={{fontSize: '14pt'}}><MdPhotoLibrary size={30} /> <span style={{verticalAlign: 'middle'}}> MULTI IMAGE</span></p>
              </div>
            </div>
            <p className="title dark-blue" style={{marginBottom: '20px'}}>Images</p>
            <div className="fb-images-container">
              {_.chunk(imageLibrary, 3).map((g, i) => {
                return (
                  <div key={`fb-images-row-${i}`} className="fb-images-row">
                    {_.concat(g, _.fill(Array(3 - g.length), '')).map((e, j) => {
                      const url = e.url_128;
                      return (
                        <div key={`fb-image-${i}-${j}`} className={classNames('fb-image', {selected: e && e.hash == pickedImage})} onClick={(e1) => e && this.setState({pickedImage: e.hash, pickedImageError: ''})}>
                          <img src={url} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            {pickedImageError && <p className="error-text">{pickedImageError}</p>}
            <div style={{marginBottom: '50px'}} />
            <p className="title dark-blue" style={{marginBottom: '20px'}}>Info</p>
            <div style={{marginBottom: '20px'}}>
              <LimitedTextInput label="HEADLINE" singleLine={true} maxlength={25} value={headline} onChange={(e) => this.setState({headline: e.target.value, headlineError: ''})} />
              {headlineError && <p className="error-text">{headlineError}</p>}
            </div>
            <div style={{marginBottom: '20px'}}>
              <LimitedTextInput label="TEXT" singleLine={false} maxlength={90} value={text} onChange={(e) => this.setState({text: e.target.value, textError: ''})} />
              {textError && <p className="error-text">{textError}</p>}
            </div>
            <div style={{marginBottom: '20px'}}>
              <LimitedTextInput label="DESCRIPTION" singleLine={false} maxlength={200} value={description} onChange={(e) => this.setState({description: e.target.value, descriptionError: ''})} />
              {descriptionError && <p className="error-text">{descriptionError}</p>}
            </div>
            <div style={{marginBottom: '20px'}}>
              <LimitedTextInput label="DISPLAY LINK" singleLine={true} maxlength={100} value={displayLink} onChange={(e) => this.setState({displayLink: e.target.value, displayLinkError: ''})} />
              {displayLinkError && <p className="error-text">{displayLinkError}</p>}
            </div>
          </div>
          <div className="ad-preview-section">
            <div className="preview-title shadowed">
              <p className="title"><FaFacebookOfficial size={40} style={{color: '#4A90E2'}} /> Ad Preview</p>
              <a className="btn btn-secondary" onClick={this.previewCampagin}>Preview</a>
            </div>
            <div className="preview-content shadowed" dangerouslySetInnerHTML={{__html: preview}} />
          </div>
        </div>
      </div>
    );
  }

  renderConfirmBlock() {
    return (
      <div>
        <div className="title-block shadowed">
          <div className="title-section">
            <p className="title">Ad Builder</p>
          </div>
        </div>
        <div className="block" style={{backgroundColor: 'transparent'}}>
          <div className="confirm-section shadowed">
            <img src={'/assets/images/success_thumb.png'} style={{marginBottom: '30px'}} />
            <p className="congrats-msg large">Great Job!</p>
            <p className="congrats-msg" style={{marginBottom: '30px'}}>Your campaign has been created.</p>
            <div style={{marginBottom: '20px'}}>
              <a className="btn btn-secondary" onClick={this.startNewCampaign}>START ANOTHER CAMPAIGN</a>
            </div>
            <div>
              <a className="btn btn-transparent dark-blue" onClick={this.goToHome}>RETURN HOME</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class LimitedTextInput extends Component {
  static propTypes = {
    singleLine: PropTypes.bool.isRequired,
    maxlength: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    singleLine: true,
    maxlength: 20,
    value: '',
    label: '',
    placeholder: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {singleLine, label, placeholder, value, maxlength, onChange} = this.props;
    return (
      <div className="limited-text-input">
        <div className="label-container">
          <p className="left-label">{label}</p>
          <p className="right-label">{`${value.length} / ${maxlength}`}</p>
        </div>
        {singleLine ?
          <input className="text-input fill" type="text" maxLength={maxlength} placeholder={placeholder} value={value} onChange={onChange} />
        :
          <textarea className="text-input fill" rows={3} maxLength={maxlength} placeholder={placeholder} value={value} onChange={onChange} />
        }
      </div>
    );
  }
}
