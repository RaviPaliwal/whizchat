import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemAvatar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Remove, Search } from "@mui/icons-material";
import { useSearchContext } from "../Context/SearchContext";
import { BaseUrl } from "../config";

const AddGroupChat = ({ open, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const Sc = useSearchContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const results = await Sc.handleSearch(searchTerm);
      setSearchResults(results);
    }
  };

  const handleSelectMember = (member) => {
    // Check if the member is not already in selectedMembers
    if (!selectedMembers.some((selected) => selected._id === member._id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (member) => {
    // Filter out the selected member to remove from the array
    const updatedMembers = selectedMembers.filter(
      (selected) => selected._id !== member._id
    );
    setSelectedMembers(updatedMembers);
  };

  const steps = [
    {
      title: "Group Details",
      content: (
        <>
          <Typography variant="subtitle1" color="initial">
            GroupName
          </Typography>
          <TextField variant="outlined" fullWidth />
          <Typography variant="subtitle1" color="initial">
            Profile
          </Typography>
          <TextField variant="outlined" fullWidth />
          <Typography variant="subtitle1" color="initial">
            Description
          </Typography>
          <TextField variant="outlined" fullWidth multiline rows={3} />
        </>
      ),
    },
    {
      title: "Add Members",
      content: (
        <>
          <Typography variant="subtitle1" color="primary">
            <Search /> Search Users
          </Typography>
          <TextField variant="standard" fullWidth onChange={handleSearch} />

          {/* Display search results */}
          {searchResults.map((result) => (
            <Card
              key={result._id}
              variant="outlined"
              sx={{ marginBottom: 2 }}
              style={{ display: "flex", marginTop: "5px", justifyContent:"space-between", height:"4rem" }}
            >
              <CardHeader
                style={{marginTop: "15px", alignSelf:"center"}}
                avatar={
                    result.avatar !==null?
                  (<Avatar
                    style={{marginBottom: "15px"}}
                    alt={result.username}
                    src={`${BaseUrl}/api/user/${result.email}/avatar`}
                    aria-label="userAvatar"
                  />):(<Avatar
                    style={{marginBottom: "15px"}}
                    alt={result.username}
                  >{result.name[0]}</Avatar>)
                }
                action={<IconButton aria-label=""></IconButton>}
                title={result.name}
                subheader={
                  <p style={{ color: "#af9faf" }}>{result.username}</p>
                }
              />

              <CardActions>
                <IconButton
                  color="primary"
                  variant="outlined"
                  onClick={() => handleSelectMember(result)}
                >
                  <Add />
                </IconButton>
              </CardActions>
            </Card>
          ))}

          {/* Display selected members */}
          <div>
            <Typography variant="subtitle1" color="primary">
              Selected Members:
            </Typography>
            {selectedMembers.map((result) => (
               <Card
               key={result._id}
               variant="outlined"
               sx={{ marginBottom: 2 }}
               style={{ display: "flex", marginTop: "5px",justifyContent:"space-between", height:"4rem" }}
             >
               <CardHeader
                 style={{marginTop: "15px"}}
                 avatar={
                    result.avatar !==null?
                    (<Avatar
                        style={{marginBottom: "15px"}}
                      alt={result.username}
                      src={`${BaseUrl}/api/user/${result.email}/avatar`}
                      aria-label="userAvatar"
                    />):(<Avatar
                        style={{marginBottom: "15px"}}
                      alt={result.username}
                    >{result.name[0]}</Avatar>)
                 }
                 action={<IconButton aria-label=""></IconButton>}
                 title={result.name}
                 subheader={
                   <p style={{ color: "#af9faf" }}>{result.username}</p>
                 }
               />
 
               <CardActions>
                 <IconButton

                   color="primary"
                   variant="outlined"
                   onClick={() => handleRemoveMember(result)}
                 >
                   <Remove/>
                 </IconButton>
               </CardActions>
             </Card>
            ))}
          </div>
        </>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={false}>
        <DialogTitle>{steps[currentStep].title}</DialogTitle>
        <DialogContent style={{ minHeight: "400px", minWidth: "400px" }}>
          {steps[currentStep].content}
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            {currentStep !== 0 && (
              <Button onClick={handleBack} variant="outlined">
                Back
              </Button>
            )}
            {!isLastStep && (
              <Button onClick={handleNext} variant="contained" color="primary">
                Next
              </Button>
            )}
            {isLastStep && (
              <Button onClick={onClose} variant="contained" color="primary">
                Create Group Chat
              </Button>
            )}
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddGroupChat;
