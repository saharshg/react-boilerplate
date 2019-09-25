/* eslint-disable camelcase */
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
// import updateCharacterAction from '../actions/actionUpdatePerfCharacter';

import Profile from '../scenes/Profile/Profile';

const getValidCredits = (rate) => {
  if (rate > 200) {
    return 200;
  }
  if (rate < 0) {
    return 0;
  }
  return Number(rate);
};

// Map data from API
const fromApiAdapter = (charData = {}, perfData = {}, formData = {}) => {
  const {
    objid,
    display_name,
    profile_description,
    videochatrate = 0,
    primary_pic_url = '',
    background_pic_url = '',
  } = charData;

  // Form data initialized with data from login response
  const {
    headline,
    description = profile_description,
    // primaryPic = [],
    // backgroundPic = [],
    videoChatRate = videochatrate,
  } = formData;

  const headlineData = headline || charData.headline;
  // let primaryPicData = primary_pic_url;
  // let backgroundPicData = background_pic_url;

  // if (backgroundPic[0] && typeof backgroundPic[0] !== 'string') {
  //   backgroundPicData = URL.createObjectURL(backgroundPic[0]);
  // }

  // if (primaryPic[0] && typeof primaryPic[0] !== 'string') {
  //   primaryPicData = URL.createObjectURL(primaryPic[0]);
  // }

  return {
    charId: objid,
    perfId: perfData.objid,
    displayName: display_name,
    headline: headlineData,
    description,
    videoChatRate: getValidCredits(videoChatRate),
    primaryPic: primary_pic_url,
    backgroundPic: background_pic_url,
  };
};

// Filter profile data to call perfperformer and perfcharacter end points separately
const profileSelector = (dispatch, profile) => {
  const apiAdapter = {
    id: 'objid',
    headline: 'headline',
    description: 'profile_description',
    videoChatRate: 'videochatrate',
    backgroundPic: 'background_picture',
    primaryPic: 'primary_picture',
  };

  // mapping api keys
  const toApi = {};
  Object.keys(profile).forEach((key) => {
    toApi[apiAdapter[key]] = profile[key];
  });

  // update login data in redux
  const updateStore = (response, dataToUpdate, keyToUpdate) => {
    const { value: { data = {} } = {} } = response;
    const key = Object.keys(toApi).filter(it => it !== 'objid')[0];
    let payload = {};

    if (keyToUpdate) {
      payload = { [keyToUpdate]: data[keyToUpdate] };
    } else {
      payload = { [key]: data[key] };
    }

    // dispatch(updateLoginData(payload, dataToUpdate));
  };

  const formData = new FormData();
  Object.keys(toApi).forEach((key) => {
    formData.append(key, toApi[key]);
  });

  const putImageData = (image) => {
    dispatch(
      // updateCharacterAction(
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       Accept: 'application/json',
      //       type: 'formData',
      //     },
      //   },
      // ),
    ).then(response => updateStore(response, 'character', image));
  };

  if ('videochatrate' in toApi) {
    // dispatch(updatePerformer(formData)).then(response => updateStore(response, 'performer'));
  } else if ('background_picture' in toApi) {
    putImageData('background_pic_url');
  } else if ('primary_picture' in toApi) {
    putImageData('primary_pic_url');
  } else {
    // dispatch(updateCharacterAction(formData)).then(
    //   response => updateStore(response, 'character'),
    // );
  }
};

export const mapStateToProps = (state) => {
  const {
    form: {
      profileSetting: { values = {}, syncErrors = {} } = {},
    } = {},
    login: { data: { perfcharacter = [{}], perfperformer = {} } = {} } = {},
    updateCharacter,
  } = state;

  const {
    headline,
    profile_description,
    primary_pic_url,
    background_pic_url,
  } = perfcharacter[0];

  const { videochatrate } = perfperformer;

  const initialFormValues = {
    headline,
    description: profile_description,
    videoChatRate: videochatrate || 0,
    primaryPic: primary_pic_url,
    backgroundPic: background_pic_url,
  };

  let primaryPicUrl = '';
  if (values.primaryPic && values.primaryPic.length > 0 && typeof values.primaryPic[0] !== 'string') {
    primaryPicUrl = URL.createObjectURL(values.primaryPic[0]);
  }

  let backgroundPicUrl = '';
  if (values.backgroundPic && values.backgroundPic.length > 0 && typeof values.backgroundPic[0] !== 'string') {
    backgroundPicUrl = URL.createObjectURL(values.backgroundPic[0]);
  }

  return {
    formData: { primaryPicUrl, backgroundPicUrl },
    profile: fromApiAdapter(perfcharacter[0], perfperformer, values),
    initialValues: initialFormValues,
    // isCharacterLoading: updateCharacter.isLoading,
    // errors: { ...syncErrors, updateChar: updateCharacter.error || false },
  };
};

export const mapDispatchToProps = dispatch => ({
  updateProfile: data => profileSelector(dispatch, data),
});

const FormWrapper = reduxForm({
  form: 'profileSetting',
})(Profile);

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormWrapper);

export default ProfileContainer;
