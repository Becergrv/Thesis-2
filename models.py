from django.db import models

class Position(models.Model):
    position_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.position_name

class Personnel(models.Model):
    name = models.CharField(max_length=255)
    birthdate = models.DateField()
    birth_place = models.CharField(max_length=255, default="Unknown")
    present_address = models.TextField()
    provincial_address = models.TextField()
    contact_number = models.CharField(max_length=20)
    marital_status = models.CharField(max_length=10, choices=[('Single', 'Single'), ('Married', 'Married')])
    spouse_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

# Use ForeignKey relationships for normalized and efficient design
class EmploymentDetails(models.Model):
    personnel = models.ForeignKey(Personnel, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=15, choices=[('Contractual', 'Contractual'), ('Regular', 'Regular')])
    date_hired = models.DateField()
    latest_evaluation = models.DateField()
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.personnel.name} - {self.position.position_name}"

class Identification(models.Model):
    personnel = models.ForeignKey(Personnel, on_delete=models.CASCADE)
    sss = models.CharField(max_length=20, blank=True, null=True)
    philhealth = models.CharField(max_length=20, blank=True, null=True)
    pag_ibig = models.CharField(max_length=20, blank=True, null=True)
    tin = models.CharField(max_length=20, blank=True, null=True)
