import {ReactNode} from 'react';
import {Box, styled, Tab, TabProps, Tabs} from '@mui/material';

type Props = {
  activeTab: number;
  onChange: (newValue: number) => void;
  tabs: {button: TabProps; children: ReactNode}[];
};

const MyTabs = ({activeTab, tabs, onChange}: Props) => {
  return (
    <>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => onChange(newValue)}
          variant="fullWidth"
        >
          {tabs.map((tab) => (
            <Tab
              label={tab.button.label}
              icon={tab.button.icon}
              iconPosition="end"
              sx={{
                textTransform: 'initial',
                '& .MuiSvgIcon-root': {
                  marginLeft: '10px',
                  width: '20px',
                  height: '20px',
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {!!tabs[activeTab] && <TabPanel>{tabs[activeTab].children}</TabPanel>}
    </>
  );
};

export default MyTabs;

const TabPanel = styled(Box)(() => ({
  padding: '15px 25px 25px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '450px',
  overflow: 'auto',
  '@media (max-height:700px)': {
    maxHeight: '500px',
  },
}));
