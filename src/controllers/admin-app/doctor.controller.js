
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const DoctorModel = require('../../models/doctor.model')
const { validationResult } = require('express-validator');
const InspectionModel = require('../../models/inspector_category.model');
const DoctorCategory = require('../../models/doctor_category.model')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class DoctorController {
    getAll = async (req, res, next) => {
        const model = await DoctorModel.findAll({ 
            // include: InspectionModel
            include:[
                {model: DoctorCategory, as: 'doctor_category'}
            ]
        }); 
        res.send(model)
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await DoctorModel.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.send(model)
    }

    byName = async (req, res, next) => {
        this.checkValidation(req);
        const model = await DoctorModel.findAll({
            attributes: ['category_id']
        })
        res.status(200).send({
            error: false,
            error_code: 201,
            message: "malumot keldi",
            data: model
        })
    }

   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await DoctorModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qoshildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await DoctorModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.category_id = req.body.category_id
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
 const model =   await DoctorModel.destroy({
        where:{
          id: req.params.id
        }
    });
    if(!model){
        throw new HttpException(404, "bunday id yoq")
    }
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot o\'chirildi',
        data: model
    });
}
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

   
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new DoctorController;