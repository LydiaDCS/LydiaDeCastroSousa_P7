
//je récupère les infos de mon user 
exports.getOneUser = (req, res, next) => {
    User.findOne({
        id: req.params.id
    }).then(
        (user) => {
            res.status(200).json(user);
            console.log(user);
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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });
    User.updateOne({ id: req.params.id }, user)
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
    User.deleteOne({ id: req.params.id })
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
