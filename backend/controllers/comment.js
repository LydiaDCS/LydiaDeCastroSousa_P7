

//Créer un commentaire :POST

exports.getallcomments = (req, res, next) => {
  comment.find().then(
      () => {
          res.status(200).json(posts);
      }
  ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
};

exports.updateComment = (req, res, next) => {
  comment.find().then(
      () => {
          res.status(200).json(posts);
      }
  ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
};

exports.deleteComment = (req, res, next) => {
  comment.find().then(
      () => {
          res.status(200).json(posts);
      }
  ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
};

exports.postComment = (req, res, next) => {
  comment.find().then(
      () => {
          res.status(200).json(posts);
      }
  ).catch(
      (error) => {
          res.status(400).json({
              error: error
          });
      }
  );
};
