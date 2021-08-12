import {
  Container, Divider, Menu, MenuItem,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import {
  EmojiEvents as AchievementsIcon,
  School as LearnIcon,
  Create as LessonIcon,
  AccountBox as AccountIcon,
  Home as HomeIcon,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { signOut } from '../api/auth';
import { useAuth } from '../contexts/authContext';
import AuthModal from './AuthModal';
import { StyledIcon, StyledNavItem, StyledSpan } from './styles';
import { getLessonType, getPreparedKanas, getSelectedMaterialsBlock } from '../store/lesson/selectors';

export const LOGIN = 'login' as const;
export const SIGNUP = 'signup' as const;
export type AuthModalType = typeof LOGIN | typeof SIGNUP | undefined

const Header: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('');
  const location = useLocation();
  const [openedModal, setOpenedModal] = useState<AuthModalType>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const lessonType = useSelector(getLessonType);
  const selectedMaterial = useSelector(getSelectedMaterialsBlock);
  const preparedKanas = useSelector(getPreparedKanas);

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  useEffect(() => {
    setCurrentPage(location.pathname.replace('/', ''));
  }, [location]);

  const handleAuthAction = (modalToOpen: AuthModalType) => {
    // close profile menu
    setAnchorEl(null);
    // open modal
    setOpenedModal(modalToOpen);
  };

  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="account menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      {user ? (
        [
          <MenuItem key="displayName">{`Welcome, ${user.displayName}`}</MenuItem>,
          <Divider key="divider" />,
          <MenuItem key="logout" onClick={() => { signOut(); setAnchorEl(null); }}>Logout</MenuItem>,
        ]
      ) : (
        [
          <MenuItem key="login" onClick={() => handleAuthAction(LOGIN)}>Login</MenuItem>,
          <MenuItem key="signup" onClick={() => handleAuthAction(SIGNUP)}>Signup</MenuItem>,
        ]
      )}
    </Menu>
  );

  return (
    <>
      <div style={{ borderBottom: '1px solid gray' }}>
        <Container
          style={{
            display: 'flex', justifyContent: 'space-around', padding: '1.3em 0',
          }}
          maxWidth="lg"
        >
          <StyledNavItem to="/" $selected={currentPage === ''}>
            <StyledIcon as={HomeIcon} />
            <StyledSpan>Kana Student</StyledSpan>
          </StyledNavItem>
          <StyledNavItem to="/learn" $selected={currentPage === 'learn'}>
            <StyledIcon as={LearnIcon} />
            <StyledSpan>learn</StyledSpan>
          </StyledNavItem>
          <StyledNavItem
            to="/lesson"
            $hidden={
              !lessonType || !selectedMaterial || !preparedKanas || preparedKanas?.length < 4
            }
            $selected={currentPage === 'lesson'}
          >
            <StyledIcon as={LessonIcon} />
            <StyledSpan>lesson</StyledSpan>
          </StyledNavItem>
          <StyledNavItem to="/achievements" $selected={currentPage === 'achievements'} $isGrowing>
            <StyledIcon as={AchievementsIcon} />
            <StyledSpan>achievements</StyledSpan>
          </StyledNavItem>
          <StyledNavItem as="div" onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}>
            <StyledIcon as={AccountIcon} />
            <StyledSpan>{user ? user.displayName : 'account'}</StyledSpan>
          </StyledNavItem>
          {accountMenu}
        </Container>
      </div>
      <AuthModal openedModal={openedModal} setOpenedModal={setOpenedModal} />
    </>
  );
};
export default Header;
