# env-from-s3
Load process.env variables from an S3 files securely.

Used with IAM roles and policies no S3 credentials are required to access the file.


Example Policy:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Viscious001",
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<bucket>/<key>"
        }
    ]
}
```