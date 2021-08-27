import { Typography } from '@material-ui/core';
import React from 'react';
import { TutorialImg, TutorialItem } from './styles';
import tutorial0 from '../../assets/tutorial_0.png';
import tutorial1 from '../../assets/tutorial_1.png';
import tutorial2 from '../../assets/tutorial_2.png';
import tutorial3 from '../../assets/tutorial_3.png';
import tutorial4 from '../../assets/tutorial_4.png';
import tutorial5 from '../../assets/tutorial_5.png';

const LandingPage: React.FC = () => (
  <div style={{ padding: '2em 0' }}>
    <TutorialItem>
      <div>
        <Typography gutterBottom variant="h2">
          Welcome to KanaStudent!
        </Typography>
        <Typography gutterBottom variant="h6">
          Learn Japanese aplhabet (kana) in a breeze!
          Here you can practice learning and writing of hiragana and katakana.
        </Typography>
      </div>
      <TutorialImg src={tutorial0} alt="" />
    </TutorialItem>
    <TutorialItem $reverse>
      <div>
        <Typography gutterBottom variant="h2">
          Kana selection
        </Typography>
        <Typography gutterBottom variant="h6">
          KanaStudent provides learning for 71 hiraganas and 48 katakanas.
          To start pick hiragana or katakana and add kanas that you want to practice.
          You can pick as many as you want but we recommend learning 5 at a time.
        </Typography>
      </div>
      <TutorialImg src={tutorial1} alt="" />
    </TutorialItem>
    <TutorialItem>
      <div>
        <Typography gutterBottom variant="h2">
          Lesson selection
        </Typography>
        <Typography gutterBottom variant="h6">
          You can choose between Guesser and Writer lessons.
          After selecting kanas and the lesson you are ready to start!
        </Typography>
      </div>
      <TutorialImg src={tutorial2} alt="" />
    </TutorialItem>
    <TutorialItem $reverse>
      <div>
        <Typography gutterBottom variant="h2">
          Guesser lesson
        </Typography>
        <Typography gutterBottom variant="h6">
          You will be given a random kana from your selection in romanji form.
          Pick the correct one out of 4 choices!
        </Typography>
      </div>
      <TutorialImg src={tutorial3} alt="" />
    </TutorialItem>
    <TutorialItem>
      <div>
        <Typography gutterBottom variant="h2">
          Writer lesson
        </Typography>
        <Typography gutterBottom variant="h6">
          You will be given a random kana from your selection in romanji form.
          Draw the correct kana and click on the &#10003;. If you are on PC
          and find it hard to draw smooth lines with a mouse check &quot;Use smoothness&quot;
          for better experience.
        </Typography>
      </div>
      <TutorialImg src={tutorial4} alt="" />
    </TutorialItem>
    <TutorialItem $reverse>
      <div>
        <Typography gutterBottom variant="h2">
          Achievements
        </Typography>
        <Typography gutterBottom variant="h6">
          Want to know how far have you gone in your learning?
          Check out the achievements tab!
        </Typography>
      </div>
      <TutorialImg src={tutorial5} alt="" />
    </TutorialItem>
  </div>
);

export default LandingPage;
