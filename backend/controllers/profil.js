
//je récupère les infos de mon user 
exports.getOneUser = (req, res, next) => {
    User.findOne({
        _id: req.params.id
    }).then(
        (User) => {
            res.status(200).json(User);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyUser = (req, res, next) => {
    const user = new User({
        _id: req.params.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
    User.updateOne({ _id: req.params.id }, user)
    .then(
        () => {
            res.status(201).json({
                message: 'User updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
    .then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
