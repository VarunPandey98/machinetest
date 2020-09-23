var mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    candidate_uuid:{
        type: String,
    },
    candidate_name:{
        type: String
    },
    candidate_email:{
        type: String
    }, 
    candidate_address:{
        type: String
    },
    candidate_created_date:{
        type: Date,
        default:Date.now
    },
    candidate_updated_date:{
        type: Date,
        default:Date.now
    },
    candidate_status:{
        type: String,
        default:'ACTIVE'
    },
    candidate_is_deleted:{
        type: String,
        default:"NO"
    }
});

module.exports = mongoose.model('candidate',CandidateSchema);
