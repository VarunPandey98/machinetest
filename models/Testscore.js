var mongoose = require('mongoose');

const TestscoreSchema = mongoose.Schema({
    testscore_uuid:{
        type: String,
        required:true
    },
    candidate_uuid:{
        type: String,
        required:true
    },
    testscore_round_name:{
        type: String,
        required:true
    },
    testscore_score:{
        type: Number
    },
    testscore_created_date:{
        type: Date,
        default:Date.now
    },
    testscore_updated_date:{
        type: Date,
        default:Date.now
    },
    testscore_status:{
        type: String,
        default:'ACTIVE'
    },
    testscore_is_deleted:{
        type: String,
        default:"NO"
    }
});

module.exports = mongoose.model('testscore',TestscoreSchema);
