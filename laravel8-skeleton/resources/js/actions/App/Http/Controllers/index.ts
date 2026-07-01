import AuthController from './AuthController'
import ResidentsController from './ResidentsController'
import MedicationsController from './MedicationsController'
import DocumentsController from './DocumentsController'
import ReportsController from './ReportsController'
import BackupController from './BackupController'

const Controllers = {
    AuthController: Object.assign(AuthController, AuthController),
    ResidentsController: Object.assign(ResidentsController, ResidentsController),
    MedicationsController: Object.assign(MedicationsController, MedicationsController),
    DocumentsController: Object.assign(DocumentsController, DocumentsController),
    ReportsController: Object.assign(ReportsController, ReportsController),
    BackupController: Object.assign(BackupController, BackupController),
}

export default Controllers